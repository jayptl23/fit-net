from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from geopy.distance import geodesic

from .models import Studio, Class, Enrollment, User
from .serializers import UserClassSerializer, ClassSerializer, StudioSerializer, LocationCoordinateSerializer, UserLoginSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

from rest_framework import serializers
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class AuthenticatedAPIView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

class StudioList(APIView):
    def get(self, request):
        studios = Studio.objects.all()
        serializer = StudioSerializer(studios, many=True)
        return Response({"studios": serializer.data})

class NearbyStudioListView(APIView):
    def get(self, request):
        """
        List studios near a given set of coordinates.
        """ 
        serializer = LocationCoordinateSerializer(data=request.data)
        if serializer.is_valid():
            latitude = serializer.data["latitude"]
            longitude = serializer.data["longitude"]
            client_coordinates = (latitude, longitude)

            all_studios = Studio.objects.all()
            sorted_studios = sorted(all_studios, key = lambda s: geodesic(client_coordinates, (s.location.latitude, s.location.longitude)))
            
            studio_serializer = StudioSerializer(sorted_studios, many=True)
            return Response(studio_serializer.data)
        else:
            return Response({"err": "Missing coorindates"}, status.HTTP_400_BAD_REQUEST)

class StudioDetails(APIView):
    '''
        List the details of a studio.
    '''
    def get(self, request, id):
        # studio = Studio.objects.get(pk=id)
        studio = get_object_or_404(Studio, pk=id)
        serializer = StudioSerializer(studio)

        classes = Class.objects.filter(studio = studio)
        class_serializer = ClassSerializer(classes, many=True)

        return Response({"studio": serializer.data, "classes": class_serializer.data})

class ListUserClasses(AuthenticatedAPIView):
    def get(self, request, id):
        print("user id", request.user.id)

        if request.user.id != int(id):
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            user = User.objects.get(pk=id)            
            enrollments = Enrollment.objects.filter(user=user)
            classes = [ enrollment.fitness_class for enrollment in enrollments ]
            serializer = UserClassSerializer(classes, many=True)
            return Response({"classes": serializer.data})
        except User.DoesNotExist:
            return Response({"err": "Something went wrong :("})

class EnrollUserInClass(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, class_id):
        # Can't enroll someone on your behalf
        if request.user.id != int(user_id):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        try:
            user = User.objects.get(pk=user_id)
            fitness_class = Class.objects.get(pk=class_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

        if fitness_class.enrollment_count == fitness_class.capacity:
            return Response({"error": "Class is full"}, status=status.HTTP_400_BAD_REQUEST)
        
        if Enrollment.objects.filter(user=user, fitness_class=fitness_class).exists():
            return Response({"error": "User already enrolled in this class"}, status=status.HTTP_400_BAD_REQUEST)

        fitness_class.enroll(user)

        return Response({"message": "User enrolled successfully"}, status=status.HTTP_201_CREATED)

class UnenrollUserFromClass(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, class_id):
        if request.user.id != int(user_id):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        try:
            user = User.objects.get(pk=user_id)
            fitness_class = Class.objects.get(pk=class_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            enrollment = Enrollment.objects.get(user=user, fitness_class=fitness_class)
        except Enrollment.DoesNotExist:
            return Response({"error": "Enrollment not found"}, status=status.HTTP_404_NOT_FOUND)

        fitness_class.unenroll(user=user)

        return Response({"message": "User unenrolled successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        try:
            serializer.save()
            return Response({'msg': 'Registration successful'}, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)

    if serializer.is_valid():
        print(serializer.validated_data)
        username = serializer.validated_data["username"]
        user = get_object_or_404(User, username=username)

        if not user.check_password(serializer.validated_data["password"]):
            return Response({"err": "invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)
        return Response({"msg": "login successful", "token": token.key, "id": user.id})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)