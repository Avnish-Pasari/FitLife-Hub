from django.db import models

# Create your models here.
class Studio(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=10)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    phone = models.CharField(max_length=10)
    amenities = models.TextField(blank=True, null=True)
    addAmenity = models.CharField(max_length=100, blank=True, null=True)
    addQuantity = models.CharField(max_length = 100, blank=True, null=True)
    image1 = models.ImageField(upload_to='studio_images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='studio_images/', blank=True, null=True)
    image3 =  models.ImageField(upload_to='studio_images/', blank=True, null=True)
    image4 =  models.ImageField(upload_to='studio_images/', blank=True, null=True)
    image5 =  models.ImageField(upload_to='studio_images/', blank=True, null=True)

    #added code
    distance = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.id is None:
            super(Studio, self).save(*args, **kwargs)
            if self.addAmenity is not None and self.addQuantity is not None:
                self.amenities += self.addQuantity + ' ' + self.addAmenity + ','
                super(Studio, self).save()
        else:
            temp = Studio.objects.get(id=self.id)
            super(Studio, self).save(*args, **kwargs)
            if temp.addAmenity != self.addAmenity or temp.addQuantity != self.addQuantity:
                if self.addAmenity is not None and self.addQuantity is not None:
                    self.amenities += self.addQuantity + ' ' + self.addAmenity + ','
                    super(Studio, self).save()
        super(Studio, self).save()
