from django.db import models
from django.contrib.auth.models import AbstractUser

class Location(models.Model):
    address = models.CharField(max_length=100, default="1 Fake Street")
    city = models.CharField(max_length=30, default="Manhattan")
    state = models.CharField(max_length=2, default="NY")
    zip_code = models.CharField(max_length=5, default="10001")
    latitude = models.FloatField(default=40.463955326099516)
    longitude = models.FloatField(default=-74.41096477481723)

    def __str__(self):
        return self.address

class Amenity(models.Model):
    name = models.CharField(max_length=30)

    class Meta():
        verbose_name_plural = "Amenities"

    def __str__(self):
        return self.name

class Image(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Studio(models.Model):
    name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=10)
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    amenities = models.ManyToManyField(Amenity, through='StudioAmenity')
    thumbnail = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='StudioThumbnail')
    images = models.ManyToManyField(Image, through='StudioImage')

    def __str__(self):
        return f"{self.name},{self.location}"

class StudioAmenity(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ('studio', 'amenity')
        verbose_name_plural = "Studio Amenities"

    def __str__(self):
        return f'{self.studio.name},{self.amenity.name},{self.quantity}'

class StudioImage(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.Case)

    class Meta():
        verbose_name_plural = "Studio Images"

    def __str__(self):
        return f'{self.studio.name},{self.image.name}'

class Class(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=280)
    coach = models.CharField(max_length=30)
    capacity = models.PositiveIntegerField()
    enrollment_count = models.PositiveIntegerField(default=0)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    day = models.CharField(max_length=50, default="Monday")
    time = models.CharField(max_length=50, default="5PM - 6PM")

    class Meta():
        verbose_name_plural = "Classes"
    
    def enroll(self, user):
        if self.enrollment_count < self.capacity:
            Enrollment.objects.create(user=user, fitness_class=self)
            self.enrollment_count += 1
            self.save()
        else:
            raise ValueError("Class is full")
    
    def unenroll(self, user):
        enrollment = Enrollment.objects.get(user=user, fitness_class=self)
        enrollment.delete()
        self.enrollment_count -= 1
        self.save()

    def __str__(self):
        return f"{self.name}@{self.studio}"

class User(AbstractUser):
    email = models.EmailField(unique=True, error_messages={'unique':"email already in use"})

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fitness_class = models.ForeignKey(Class, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'fitness_class')

    def __str__(self):
        return f"{self.user.username} enrolled in {self.fitness_class.name}"