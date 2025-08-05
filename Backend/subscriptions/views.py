import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, render
from classes.models import ClassCustomer, Session, SessionCustomer

from subscriptions.serializers import SubscriptionSerializer
from .models import Subscription
from accounts.models import Customer, PaymentInfo
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.views import Response
from django.utils.timezone import now, is_naive, make_aware, is_aware


# Create your views here.
# @csrf_exempt
# def SubscriptionView(request, *args, **kwargs):

    # id = kwargs['subscription_id']
    # print(request.user)
    # if request.user.id != kwargs['customer_id']:
    #     raise PermissionDenied()

    # subscription = Subscription.objects.get(id=id)
    # customer = Customer.objects.get(id=kwargs['customer_id'])

    # if not PaymentInfo.objects.filter(customer_id=kwargs['customer_id']).exists():
    #     return JsonResponse({'error': 'You must add a payment method before subscribing.'}, status=401)
    
    # customer.subscription_end_date = datetime.datetime.now() + subscription.time_period
    # customer.upcoming_payment = ""
    # #generating the upcoming payment schedule
    # for i in range(subscription.number):
    #     if subscription.time_interval == 'monthly':
    #         customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=30 * i)) + ","
    #     elif subscription.time_interval == 'yearly':
    #         customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=365 * i)) + ","
    #     else:
    #         customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=i)) + ","
    # print(customer.upcoming_payment)
    # makePayment(customer, subscription.price)
    # customer.save()

    # return JsonResponse({'success': 'You have successfully subscribed to this subscription plan.'}, status=200)

class SubscriptionView(UpdateAPIView):
    serializer_class = SubscriptionSerializer
    def get_object(self, *args, **kwargs):
        return get_object_or_404(Subscription, id=self.kwargs['subscription_id'])
    
    def update(self, request, *args, **kwargs):
        customer_id = self.kwargs['customer_id']
        #checking if this particular subscription exists
        if not Subscription.objects.filter(id=self.kwargs['subscription_id']).exists():
            return JsonResponse({'error': 'This subscription does not exist.'}, status=401)

        subscription_id = self.kwargs['subscription_id']

        #authorization check
        if self.request.user.id != customer_id:
            raise PermissionDenied()

        #getting the customer and subscription objects
        subscription = Subscription.objects.get(id=subscription_id)
        customer = Customer.objects.get(id=customer_id)

        #checking if the customer has a payment method
        if not PaymentInfo.objects.filter(customer_id=self.kwargs['customer_id']).exists():
            return JsonResponse({'error': 'You must add a payment method before subscribing.'}, status=401)
        
        
        customer.subscription_end_date = datetime.datetime.now() + subscription.time_period
        customer.upcoming_payment = ""
        #generating the upcoming payment schedule
        for i in range(subscription.number):
            if subscription.time_interval == 'monthly':
                customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=30 * i)) + ","
            elif subscription.time_interval == 'yearly':
                customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=365 * i)) + ","
            else:
                customer.upcoming_payment = customer.upcoming_payment + str(datetime.datetime.now().replace(microsecond=0) + datetime.timedelta(days=i)) + ","
        print(customer.upcoming_payment)
        makePayment(customer, subscription.price)
        
        customer.save()

        return JsonResponse({'success': 'You have successfully subscribed to this subscription plan. If you had a currently active subscription, the balance will be refunded.'}, status=200)
        
class UnsubcribeView(UpdateAPIView):
    # getting customer object
    serializer_class = SubscriptionSerializer
    def get_object(self, *args, **kwargs):
        return get_object_or_404(Subscription, id=self.kwargs['subscription_id'])

    def update(self, request, *args, **kwargs):
        #checking if the customer  exists
        if not Customer.objects.filter(id=self.kwargs['customer_id']).exists():
            return JsonResponse({'error': 'Customer does not exist.'}, status=401)

        customer = Customer.objects.get(id=self.kwargs['customer_id'])
        
        #checking if the customer is authorized to unsubscribe
        print(self.request.user.id)
        if self.request.user.id != self.kwargs['customer_id']:
            raise PermissionDenied()
        
        #checking if the customer has a subscription or not
        if customer.subscription_end_date == None:
            return JsonResponse({'error': 'You do not have a subscription to unsubscribe from.'}, status=401)
        
        #setting his subscription end date to None, showing that he is not subscribed
        customer.subscription_end_date = None
       
        #dropping all his classes that start after the first upcoming payment (or the time he has already paid for)
        paid_until = datetime.datetime.strptime(customer.upcoming_payment.split(',')[0], "%Y-%m-%d %H:%M:%S") #getting the first upcoming payment
        paid_until = make_aware(paid_until) #making it timezone aware
        classes = ClassCustomer.objects.filter(customer_id=self.kwargs['customer_id']) #getting all his classes
        
        for c in classes:
            sessions = Session.objects.filter(classid_id=c.classid, time__gt=paid_until) #getting all the sessions of the class
             #if the class starts after the first upcoming payment
            if sessions == None:
                c.classid.capacity += 1
                c.classid.save()
                c.delete()
            for session in sessions:
                # drop the class after increasing the capacity by 1
                session.capacity += 1
                session.save()
                sessionLink = SessionCustomer.objects.get(session_id=session.id, customer_id=self.kwargs['customer_id'])
                sessionLink.delete()

        # removing all his upcoming payments
        customer.upcoming_payment = ""

        # saving the changes
        customer.save()
    
        return JsonResponse({'success': 'You have successfully unsubscribed'}, status=200)   

class SubscriptionListView(ListAPIView):
    serializer_class = SubscriptionSerializer
    def get_queryset(self, *args, **kwargs):
        return Subscription.objects.all()
        # 
        # response = []
        # plans = Subscription.objects.all()
        # for plan in plans:
        #     response.append(plan)
        
        # return response
        # return Subscription.objects.all().values()
        


#helper payment function
def makePayment(customer, amount):
    #charging card
    payment = PaymentInfo.objects.get(customer=customer)
    print("payment has been made to card " + payment.card_number)

    #updating the customers upcoming payment and payment history
    curr_time = datetime.datetime.now()
    upcoming_list = customer.upcoming_payment.split(",")
    if datetime.datetime.strptime(upcoming_list[0], "%Y-%m-%d %H:%M:%S") <= curr_time:
        customer.payment_history =  customer.payment_history + "amount: $" + str(amount) + " at " + upcoming_list[0] + " with card number " + payment.card_number + ", "
        customer.upcoming_payment = customer.upcoming_payment.replace(upcoming_list[0] + ",", "")
    customer.save()
    return True
    