from rest_framework import serializers
from classes.models import Class, ClassCustomer, Session

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        #fields = '__all__'
        fields = ('name', 'description', 'coach', 'keywords', 'capacity', 'startdateTime', 'enddateTime', 'studio')

        def create(self, validated_data):
            class1 = Class.objects.create(**validated_data)
            return class1

class ClassCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassCustomer
        fields = ('customer', 'classid')

        def create(self, validated_data):
            classcustomer = ClassCustomer.objects.create(**validated_data)
            return classcustomer

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('name', 'time', 'capacity', 'id', 'classid')

        def create(self, validated_data):
            session = Session.objects.create(**validated_data)
            return session