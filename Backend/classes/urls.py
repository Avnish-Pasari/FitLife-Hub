from django.urls import path
from .views import ClassView, EnrolAllView, DropView, EnrolSessionView, DropSessionView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('<int:class_id>/view/', ClassView.as_view()),
    path('<int:class_id>/<int:customer_id>/enrolall/', EnrolAllView.as_view()),
    path('<int:class_id>/<int:customer_id>/unenrolall/', DropView.as_view()),
    path('<int:class_id>/<int:session_id>/<int:customer_id>/enrolsession/', EnrolSessionView.as_view()),
    path('<int:class_id>/<int:session_id>/<int:customer_id>/unenrolsession/', DropSessionView.as_view()),
]