from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'price', 'number', 'time_interval')

        def create(self, validated_data):
            subscription = Subscription.objects.create(**validated_data)
            return subscription