import datetime
from django.db import models

# Create your models here.
class Subscription(models.Model):
    price = models.DecimalField(max_digits=6, decimal_places=2)
    number = models.IntegerField(blank=True, null=True) #in months - manually inceremented to track subscription or one to many field with users?
    time_interval = models.CharField(max_length=20, blank=True, null=True) #monthly, yearly, etc
    time_period = models.DurationField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super(Subscription, self).save(*args, **kwargs)
        self.price = round(self.price, 2)

        if self.time_interval == 'monthly':
            self.time_period = datetime.timedelta(days=30 * self.number)
        elif self.time_interval == 'yearly':
            self.time_period = datetime.timedelta(days=365 * self.number)
        else:
            self.time_period = datetime.timedelta(days=self.number)
        super(Subscription, self).save()

    def __str__(self):
        return f'${self.price} {self.time_interval}'