from .models import Location, Studio, Image, Amenity, Class, User
from rest_framework import serializers

class LocationSerializer(serializers.ModelSerializer):
    class Meta():
        model = Location
        exclude = ["id", "latitude", "longitude"]

class LocationCoordinateSerializer(serializers.Serializer):
    latitude = serializers.FloatField(required=True)
    longitude = serializers.FloatField(required=True)

class AmenitySerializer(serializers.ModelSerializer):
    class Meta():
        model = Amenity
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta():
        model = Image
        fields = "__all__"
    
class StudioSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    thumbnail = ImageSerializer()
    images = ImageSerializer(many=True)
    amenities = AmenitySerializer(many=True)
    class Meta():
        model = Studio
        fields = ["id", "name", "phone_number", "location", "amenities", "thumbnail", "images",]

class SimpleStudioSerializer(serializers.ModelSerializer):
    class Meta():
        model = Studio
        fields = ["id", "name"]

class ClassSerializer(serializers.ModelSerializer):
    class Meta():
        model = Class
        exclude = ["studio"]

class UserClassSerializer(serializers.ModelSerializer):
    studio = SimpleStudioSerializer()
    class Meta():
        model = Class
        fields = ['id', 'name', 'studio', 'day', 'time']
        

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta():
        model = User
        fields = ['id', 'username', 'password', 'email']
     
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(user.password)
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)