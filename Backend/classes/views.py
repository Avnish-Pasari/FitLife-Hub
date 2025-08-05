from django.http import JsonResponse
from django.shortcuts import render
from django.core.exceptions import PermissionDenied

# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.models import Customer
from classes.models import Class, ClassCustomer, Session, SessionCustomer
from rest_framework.views import Response

from classes.serializers import ClassSerializer

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

class ClassView(RetrieveAPIView):
    serializer_class = ClassSerializer#(signups, many=True)
    permission_classes = [IsAuthenticated]
   
    def get_object(self):
        # if self.request.user.id == self.kwargs['customer_id']:
            return get_object_or_404(Class, id=self.kwargs['class_id'])
            

class EnrolAllView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):

        if request.user.id != kwargs['customer_id']:
            raise PermissionDenied()

        # getting the class and customer
        class1 = get_object_or_404(Class, id=kwargs['class_id'])
        customer1 = get_object_or_404(Customer, id=kwargs['customer_id'])

        # checking if the user is already enrolled
        if ClassCustomer.objects.filter(customer=customer1, classid=class1).exists():
            return JsonResponse({'error': 'You are already enrolled in this class.'}, status=401)
        
        # checking if the class is full
        if class1.capacity == 0:
            return JsonResponse({'error': 'This class is full.'}, status=401)
        
        # checking if the user is subscribed
        if  customer1.subscription_end_date == None:
            return JsonResponse({'error': 'You are not subscribed'}, status=401)


        class1.capacity -= 1
        class1.save()
        sessions = Session.objects.filter(classid=class1)
        count, session_cap_zero_count = 0, 0
        for session in sessions:
            count += 1
            if session.capacity > 0:
                session.capacity -= 1
                session.save()
            else:
                session_cap_zero_count += 1

        #linking the class and user together
        if count == session_cap_zero_count:
            return JsonResponse({'error': 'All sessions of this class are full.'}, status=401)

        classcustomer = ClassCustomer.objects.create(customer=customer1, classid=class1)
        classcustomer.save()
        for session in class1.session_set.all():
            if customer1.subscription_end_date > session.time and not SessionCustomer.objects.filter(customer=customer1, session=session).exists():
                sessioncustomer = SessionCustomer.objects.create(customer=customer1, session=session)
                sessioncustomer.save()
            
        return JsonResponse({'success': 'You have successfully enrolled in this class.'}, status=200)


class DropView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        if request.user.id != kwargs['customer_id']:
            raise PermissionDenied()
        class1 = get_object_or_404(Class, id=kwargs['class_id'])
        customer1 = get_object_or_404(Customer, id=kwargs['customer_id'])
        if ClassCustomer.objects.filter(customer=customer1, classid=class1).exists():

            # increasing the class capacity and the capacity of the sessions
            class1.capacity += 1
            class1.save()
            sessions = Session.objects.filter(classid=class1)
            for session in sessions:
                session.capacity += 1
                session.save()

            #deleting the class and user link
            classcustomer = ClassCustomer.objects.get(customer=customer1, classid=class1)
            classcustomer.delete()
            for session in class1.session_set.all():
                sessioncustomer = SessionCustomer.objects.get(customer=customer1, session=session)
                sessioncustomer.delete()
            return JsonResponse({'success': 'You have successfully dropped this class.'}, status=200)

        return JsonResponse({'error': 'You are not enrolled in this class.'}, status=401)

class EnrolSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.id != kwargs['customer_id']:
            raise PermissionDenied()

        # getting the class and customer and session
        class1 = get_object_or_404(Class, id=kwargs['class_id'])
        customer1 = get_object_or_404(Customer, id=kwargs['customer_id'])
        session1 = get_object_or_404(Session, id=kwargs['session_id'])
        
        # checking if the user is enrolled in the class
        if SessionCustomer.objects.filter(customer=customer1, session=session1).exists():
            return JsonResponse({'error': 'You are already enrolled in this session.'}, status=401)
        
        # checking if the class is full
        if session1.capacity == 0:
            return JsonResponse({'error': 'This class session is full.'}, status=401)
        
        # checking if the user is subscribed
        if  customer1.subscription_end_date == None:
            return JsonResponse({'error': 'You are not subscribed'}, status=401)

        #reduce the session capacity
        session1.capacity -= 1
        session1.save()

        #linking the user and session
        sessioncustomer = SessionCustomer.objects.create(customer=customer1, session=session1)
        sessioncustomer.save()

        #checking if user is not enrolled in any other session of the class and then linking the class and user
        if not ClassCustomer.objects.filter(customer=customer1, classid=class1).exists():
            classcustomer = ClassCustomer.objects.create(customer=customer1, classid=class1)
            classcustomer.save()

        return JsonResponse({'success': 'You have successfully enrolled in this session.'}, status=200)

class DropSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.id != kwargs['customer_id']:
            raise PermissionDenied()

        # getting the class and customer and session
        class1 = get_object_or_404(Class, id=kwargs['class_id'])
        customer1 = get_object_or_404(Customer, id=kwargs['customer_id'])
        session1 = get_object_or_404(Session, id=kwargs['session_id'])
        
        # checking if the user is subscribed
        if  customer1.subscription_end_date == None:
            return JsonResponse({'error': 'You are not subscribed'}, status=401)

        #reduce the session capacity
        session1.capacity += 1
        session1.save()

        #delinking the user and session
        sessioncustomer = SessionCustomer.objects.get(customer=customer1, session=session1)
        sessioncustomer.delete()

        #if user is not enrolled in any other session of the class and then delinking the class and user
        if not SessionCustomer.objects.filter(customer=customer1, session__classid=class1).exists():
            classcustomer = ClassCustomer.objects.get(customer=customer1, classid=class1)
            classcustomer.delete()
        
        return JsonResponse({'success': 'You have successfully dropped this session.'}, status=200)

