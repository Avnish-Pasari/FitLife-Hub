from rest_framework import serializers
from studios.models import Studio

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = ('id', 'name', 'address', 'postalCode', 'latitude', 'longitude', 'phone', 'amenities', 'image1', 'image2', 'image3', 'image4', 'image5')

    def create(self, validated_data):
        studio = Studio.objects.create(**validated_data)
        return studio