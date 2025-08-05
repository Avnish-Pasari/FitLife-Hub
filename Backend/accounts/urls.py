
from django import urls
from django.urls import path
from accounts.views import PaymentHistoryView, PaymentScheduleView, SignupView, UserProfileView, PaymentUpdateView, CreatePaymentInfoView, ProfileEditView, ClassHistoryView, ClassScheduleView, RetrieveCustomerIDView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('<int:customer_id>/view/', UserProfileView.as_view()),
    path('<int:customer_id>/edit/', ProfileEditView.as_view()),
    path('<int:customer_id>/createpaymentinfo/', CreatePaymentInfoView.as_view()),
    path('<int:customer_id>/editpaymentinfo/', PaymentUpdateView.as_view()),
    path('<int:customer_id>/classhistory/', ClassHistoryView.as_view()),
    path('<int:customer_id>/classschedule/', ClassScheduleView.as_view()),
    path('<int:customer_id>/paymenthistory/', PaymentHistoryView.as_view()),
    path('<int:customer_id>/upcomingpayments/', PaymentScheduleView.as_view()),
    path('retrievecustomerid/', RetrieveCustomerIDView.as_view()),
]