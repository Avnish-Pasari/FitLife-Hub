from rest_framework import serializers
from accounts.models import Customer, PaymentInfo
from django.contrib.auth.models import User

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'phone', 'avatar', 'subscription_end_date', 'id')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Customer.objects.create_user(**validated_data)
        return user

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentInfo
        fields = ('card_number', 'card_holder_name', 'expiration_date', 'cvv', 'customer')
    
    def create(self, validated_data):
        payment = PaymentInfo.objects.create(**validated_data)
        return payment

# class ErrorSerialzer(serializers.Serializer):
#     error = serializers.CharField(max_length=200)