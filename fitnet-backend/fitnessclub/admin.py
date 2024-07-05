from django.contrib import admin
from fitnessclub.models import Studio, Location, Amenity, StudioAmenity, Image, StudioImage, Class, User, Enrollment

admin.site.register(Studio)
admin.site.register(Location)
admin.site.register(Amenity)
admin.site.register(StudioAmenity)
admin.site.register(Image)
admin.site.register(StudioImage)
admin.site.register(Class)
admin.site.register(User)
admin.site.register(Enrollment)