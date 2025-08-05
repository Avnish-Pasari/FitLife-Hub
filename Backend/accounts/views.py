import datetime
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.models import Customer, PaymentInfo
from rest_framework.views import Response
from classes.serializers import SessionSerializer
from classes.views import DropView
from classes.models import Class, ClassCustomer, Session, SessionCustomer
from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
from django.utils.timezone import now, is_naive, make_aware, is_aware

from accounts.serializers import PaymentSerializer, SignupSerializer
from classes.models import Class, ClassCustomer
from rest_framework.pagination import LimitOffsetPagination


# Create your views here.
class SignupView(CreateAPIView):
    serializer_class = SignupSerializer


class UserProfileView(RetrieveAPIView):
    serializer_class = SignupSerializer#(signups, many=True)
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.request.user.id == self.kwargs['customer_id']:
            obj = get_object_or_404(Customer, id=self.kwargs['customer_id'])
            self.check_object_permissions(self.request, obj)
            return obj
        raise PermissionDenied()
        

class ProfileEditView(UpdateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # if self.request.user.id == self.kwargs['customer_id']:
            obj = get_object_or_404(Customer, id=self.kwargs['customer_id'])
            # self.check_object_permissions(self.request, obj)
            return obj
        # raise PermissionDenied()

        

class CreatePaymentInfoView(CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


class PaymentUpdateView(RetrieveAPIView, UpdateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.request.user.id == self.kwargs['customer_id'] :
            return get_object_or_404(PaymentInfo, customer_id=self.kwargs['customer_id'])
        raise PermissionDenied()
            

class ClassHistoryView(APIView, LimitOffsetPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['customer_id']

        if request.user.id != id:
            raise PermissionDenied()

        classes = ClassCustomer.objects.filter(customer_id=id)
        sessions = SessionCustomer.objects.filter(customer_id=id)
        
        response = []
        curr_time = datetime.datetime.now()
        curr_time = make_aware(curr_time)

        queryset = Session.objects.filter(id__in=sessions.values_list('session_id', flat=True), time__lt=curr_time)

        queryset = queryset.order_by('time')

        self.paginate_queryset(queryset, request, view=self)

        serializer = SessionSerializer(queryset, many=True)

        return self.get_paginated_response(serializer.data)
        # for c in classes:
        #     sessions = Session.objects.filter(classid=c.classid)
        #     for s in sessions:
        #         if s.time < curr_time:
        #             response.append((s.time, (c.classid.name, c.classid.studio.name, c.classid.description, c.classid.coach, c.classid.keywords, c.classid.capacity, s.time.strftime("%Y-%m-%d %H:%M:%S"))))
                    
        # response.sort(key=lambda x: x[0])
        # finalresponse = []
        # for r in response:
        #     finalresponse.append(r[1])
        # return JsonResponse(finalresponse, safe=False)
   


class ClassScheduleView(APIView, LimitOffsetPagination):
    # Change to paginated response
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['customer_id']

        paginator = LimitOffsetPagination()
        if request.user.id != id:
            raise PermissionDenied()

        classes = ClassCustomer.objects.filter(customer_id=id)
        sessions = SessionCustomer.objects.filter(customer_id=id)
        response = []
        curr_time = datetime.datetime.now()
        curr_time = make_aware(curr_time)


        queryset = Session.objects.filter(id__in=sessions.values_list('session_id', flat=True), time__gte=curr_time)

        queryset = queryset.order_by('time')

        results = paginator.paginate_queryset(queryset, request, view=self)

        serializer = SessionSerializer(results, many=True)

        return paginator.get_paginated_response(serializer.data)
        # for c in classes:
        #     sessions = Session.objects.filter(classid=c.classid)
        #     for s in sessions:
        #         if s.time >= curr_time:
        #             response.append((s.time, (c.classid.name, c.classid.studio.name, c.classid.description, c.classid.coach, c.classid.keywords, c.classid.capacity, s.time.strftime("%Y-%m-%d %H:%M:%S"))))
                    
        # response.sort(key=lambda x: x[0])
        # finalresponse = []
        # for r in response:
        #     finalresponse.append(r[1])
        # return JsonResponse(finalresponse, safe=False)


class PaymentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['customer_id']
        if request.user.id != id:
            raise PermissionDenied()
        customer = Customer.objects.get(id=id)
        response = customer.payment_history.split(',')
        response.remove(' ')
        return JsonResponse(response, safe=False)

class PaymentScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['customer_id']
        if request.user.id != id:
            raise PermissionDenied()
        customer = Customer.objects.get(id=id)
        response = customer.upcoming_payment.split(',')
        response.remove('')
        return JsonResponse(response, safe=False)

class RetrieveCustomerIDView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        username = request.data['username']
        customer = Customer.objects.get(username=username)
        id = customer.id
        return JsonResponse(id, safe=False)

