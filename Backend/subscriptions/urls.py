from django import urls
from django.urls import path
from subscriptions.views import SubscriptionView, UnsubcribeView, SubscriptionListView

urlpatterns = [
    path('<int:subscription_id>/<int:customer_id>/subscribe/', SubscriptionView.as_view()),
    path('<int:subscription_id>/<int:customer_id>/unsubscribe/', UnsubcribeView.as_view()),
    path('viewall/', SubscriptionListView.as_view()),
]