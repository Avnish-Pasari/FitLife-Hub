from django import urls
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from studios.views import ClassesFilterView, StudioFilterView, StudioView, AllStudioClassesView, StudioListView

urlpatterns = [
    path('view/', StudioListView.as_view()),
    path('view/filter/', StudioFilterView.as_view()),
    path('<int:studio_id>/', StudioView.as_view()),
    path('<int:studio_id>/classes/', AllStudioClassesView.as_view()),
    path('<int:studio_id>/classes/filter/', ClassesFilterView.as_view()),
]