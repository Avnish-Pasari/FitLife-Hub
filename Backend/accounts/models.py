from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
# class Customer(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
#     phone = models.CharField(max_length=10)
#     subscribed_end_date = models.DateTimeField(blank=True, null=True) #manual incrementing using subscirption duration
#     payment_info = models.TextField(blank=True, null=True) # can see if additional card model is useful?
#     payment_history = models.TextField(blank=True, null=True) # every time user subscirbes, add the time of creation + duration of subscription + price to this field separeted by commas

#     def __str__(self):
#         return self.name

class Customer(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    subscription_end_date = models.DateTimeField(blank=True, null=True) #set this to the current date when the user clicks subscribe on a plan
    payment_history = models.TextField(default = '') # every time user subscirbes, add the time of creation + duration of subscription + price to this field separeted by commas
    upcoming_payment = models.TextField(default = '') # 

    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if self.id is not None and self.is_superuser == False and self.password != '' :
            # super(Customer, self).save(*args, **kwargs)
            print(self.id)
            print("PASSWORD" + self.password)
            if self.password != Customer.objects.get(id=self.id).password:
                print("PASSWORD CHANGED")
                self.set_password(self.password)
            super(Customer, self).save()
        else:
            super(Customer, self).save(*args, **kwargs)
        

class PaymentInfo(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, blank=True, null=True)
    card_number = models.CharField(max_length=16, blank=True, null=True)
    card_holder_name = models.CharField(max_length=50, blank=True, null=True)
    expiration_date = models.CharField(max_length=5, blank=True, null=True)
    cvv = models.CharField(max_length=3, blank=True, null=True)

    def __str__(self):
        return self.card_holder_name