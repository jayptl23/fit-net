"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from fitnessclub.views import StudioList, NearbyStudioListView, StudioDetails, ListUserClasses, EnrollUserInClass, UnenrollUserFromClass, signup, login

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="FitNet API",
        default_version='v1',
        description="Docs for FitNet API",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="Awesome License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('studios/', view=StudioList.as_view()),
    path('studios/nearby', view=NearbyStudioListView.as_view()),

    path('studios/<int:id>', view=StudioDetails.as_view()),
    path('users/<int:id>/classes', view=ListUserClasses.as_view()),
    path('user/<int:user_id>/enroll/<int:class_id>/', EnrollUserInClass.as_view(), name='enroll-user'),
    path('user/<int:user_id>/unenroll/<int:class_id>/', UnenrollUserFromClass.as_view(), name='unenroll-user'),

    path('signup/', view=signup),
    path('login/', view=login),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
