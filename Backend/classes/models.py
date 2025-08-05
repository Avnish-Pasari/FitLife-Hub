from django.db import models
import datetime, calendar

# Create your models here.

class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    coach = models.CharField(max_length=200)
    keywords = models.TextField(blank=True, null=True)
    capacity = models.IntegerField(blank=True, null=True)
    # sessions = models.TextField(blank=True, null=True) # added for recursion
    startdateTime = models.DateTimeField(blank=True, null=True)
    enddateTime = models.DateTimeField(blank=True, null=True) 
    studio = models.ForeignKey('studios.Studio', on_delete=models.CASCADE)
    users = models.ManyToManyField('accounts.Customer', through='ClassCustomer') #does it need to co
    

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        
        if self.id is None:
            super(Class, self).save(*args, **kwargs)
            endtime = self.enddateTime
            currtime = self.startdateTime
            while endtime >= currtime:
               Session.objects.create(classid=self, name = self.name, time=currtime, capacity=self.capacity)
               currtime += datetime.timedelta(days=7)
               
            super(Class, self).save()
        else:
            temp = Class.objects.get(id=self.id)
            super(Class, self).save(*args, **kwargs)
            if temp.startdateTime != self.startdateTime or temp.enddateTime != self.enddateTime:
                # self.sessions = '' # delete all current sessions of the class
                Session.objects.filter(classid=self).delete()
                endtime = self.enddateTime
                currtime = self.startdateTime
                while endtime >= currtime:
                   Session.objects.create(classid=self, name = self.name, time=currtime, capacity=self.capacity)
                   currtime += datetime.timedelta(days=7)
                super(Class, self).save()

class Session(models.Model):
    classid = models.ForeignKey('Class', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    time = models.DateTimeField(blank=True, null=True)
    capacity = models.IntegerField(blank=True, null=True)
    users = models.ManyToManyField('accounts.Customer', through='SessionCustomer')

    def save(self, *args, **kwargs):
        super(Session, self).save(*args, **kwargs)
        self.name = self.classid.name
    def __str__(self):
        return self.classid.name + ' at ' + str(self.time)

class ClassCustomer(models.Model):
    customer = models.ForeignKey('accounts.Customer', on_delete=models.CASCADE)
    classid = models.ForeignKey('Class', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class SessionCustomer(models.Model):
    customer = models.ForeignKey('accounts.Customer', on_delete=models.CASCADE)
    session = models.ForeignKey('Session', on_delete=models.CASCADE)
    def __str__(self):
        return self.name


