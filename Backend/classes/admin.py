from django.contrib import admin
from .models import Class, ClassCustomer, Session #, Keyword
# Register your models here.
@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_filter = ("studio",)
# admin.site.register(Keyword)
# admin.site.register(ClassCustomer)
@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_filter = ("classid",)
