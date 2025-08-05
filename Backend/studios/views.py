from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from classes.serializers import ClassSerializer, SessionSerializer
from studios.models import Studio
from studios.serializers import StudioSerializer
from rest_framework.views import Response
from classes.models import Class, Session
import datetime
import json
from geopy.distance import geodesic
from django.utils.timezone import now, is_naive, make_aware, is_aware
from rest_framework.pagination import LimitOffsetPagination


# Create your views here.
class StudioView(RetrieveAPIView):
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['studio_id'])

# def AllStudioClassesView(request, *args, **kwargs):
#     id = kwargs['studio_id']

#     if not Studio.objects.filter(id=id).exists():
#         return JsonResponse({'error': 'Studio does not exist'}, status=404)

#     classes = Class.objects.filter(studio_id=id)
#     response = []
#     curr_time = datetime.datetime.now()
#     curr_time = make_aware(curr_time)
#     for c in classes:
#         sessions = Session.objects.filter(classid=c.id)
#         for s in sessions:
#             if s.time > curr_time:
#                 response.append((s.time, (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, s.time.strftime("%Y-%m-%d %H:%M:%S"))))
                
#     response.sort(key=lambda x: x[0])
#     finalresponse = []
#     for r in response:
#         finalresponse.append(r[1])
#     return JsonResponse(finalresponse, safe=False)

class AllStudioClassesView(ListAPIView):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # checking if studio exists
        id = self.kwargs['studio_id']
        studio = get_object_or_404(Studio, id=id)

        # getting all classes
        classes = Class.objects.filter(studio_id=self.kwargs['studio_id'])

        # getting all sessions
        sessions = Session.objects.filter(classid__in=classes)

        # filtering out sessions that were in the past or cancelled
        sessions.filter(time__gte=now())
        return sessions
        

# @csrf_exempt
# def ClassesFilterView(request, *args, **kwargs):
#     id = kwargs['studio_id']

#     if not Studio.objects.filter(id=id).exists():
#         return JsonResponse({'error': 'Studio does not exist'}, status=404)

#     classes = Class.objects.filter(studio_id=id)
#     response = []
#     curr_time = datetime.datetime.now()
#     curr_time = make_aware(curr_time)

#     name = request.POST.get('name', None)
#     coach = request.POST.get('coach', None)
#     date1 = request.POST.get('date', None)
#     start_date = request.POST.get('start_date', None)
#     end_date = request.POST.get('end_date', None)
    

#     for c in classes:
#         sessions = Session.objects.filter(classid=c.id)

#         if name != '' and name != c.name: # name filter
#             continue

#         if coach != '' and coach != c.coach: # coach filter
#             continue

#         for s in sessions:
#             date = s.time
#             # if date >= curr_time and (date1 != '' and date >= make_aware(datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S"))):
#             #     # exact date and time filter
#             #     if date1 != '' and date == make_aware(datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")): #date filter (specific)
#             #         response.append((make_aware(datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")), (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date1)))
#             #         break

#             #     # date range filter
#             #     if start_date != '' and end_date != '':
#             #         if make_aware(datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S")) <= date <= make_aware(datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S")): #date filter (range)
#             #             continue #date filter (range)  
#                 # response.append((date, (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date.strftime("%Y-%m-%d %H:%M:%S"))))
#             if date1 == start_date == end_date == '':
#                 if date >= curr_time:
#                     response.append((date, (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date.strftime("%Y-%m-%d %H:%M:%S"))))

#             if date1 != '' and date >= make_aware(datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")) >= curr_time:
#                 response.append((make_aware(datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")), (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date1)))
#                 break

#             if start_date != '' and end_date != '':
#                 if curr_time <= make_aware(datetime.datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S")) <= date <= make_aware(datetime.datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S")):
#                     response.append((date, (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date.strftime("%Y-%m-%d %H:%M:%S"))))
#                     continue
            
#             # response.append((date, (c.name, c.studio.name, c.description, c.coach, c.keywords, c.capacity, date.strftime("%Y-%m-%d %H:%M:%S"))))
                
#     response.sort(key=lambda x: x[0])
#     finalresponse = []
#     for r in response:
#         finalresponse.append(r[1])
#     return JsonResponse(finalresponse, safe=False)

# class ClassesFilterView(ListAPIView):
#     serializer_class = SessionSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # checking if studio exists
#         id = self.kwargs['studio_id']
#         studio = get_object_or_404(Studio, id=id)

#         # getting all classes
#         classes = Class.objects.filter(studio_id=self.kwargs['studio_id'])

#         # getting all sessions
#         sessions = Session.objects.filter(classid__in=classes)

#         # filtering out sessions that were in the past or cancelled
#         sessions.filter(time__gte=now())

#         # filtering out sessions that don't match the filters
#         name = self.request.POST.get('name', None)
#         coach = self.request.POST.get('coach', None)
#         date1 = self.request.POST.get('date', None)
#         time1 = self.request.POST.get('time', None)
#         start_date = self.request.POST.get('start_date', None)
#         end_date = self.request.POST.get('end_date', None)

#         if name != '' and name != None:
#             classes = classes.filter(name=name)
#         if coach != '' and coach != None:
#             classes = classes.filter(coach=coach)

#         # refiltering sessions to update for new class filters
#         sessions = sessions.filter(classid__in=classes)

#         if date1 != '' and date1 != None:
#             sessions = sessions.filter(time__date=date1)
#         if time1 != '' and time1 != None:
#             sessions = sessions.filter(time__time=time1)
#         if start_date != '' and end_date != '' and start_date != None and end_date != None:
#             sessions = sessions.filter(time__range=[start_date, end_date])
        
#         return sessions

    # def post(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)
class ClassesFilterView(APIView, LimitOffsetPagination):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        paginator = LimitOffsetPagination()
        
        # checking if studio exists
        id = self.kwargs['studio_id']
        studio = get_object_or_404(Studio, id=id)

        # getting all classes
        classes = Class.objects.filter(studio_id=self.kwargs['studio_id'])

        # getting all sessions
        sessions = Session.objects.filter(classid__in=classes)

        # filtering out sessions that were in the past or cancelled
        sessions.filter(time__gte=now())

        # filtering out sessions that don't match the filters
        name = self.request.POST.get('name', None)
        coach = self.request.POST.get('coach', None)
        date1 = self.request.POST.get('date', None)
        time = self.request.POST.get('time', None)
        start_date = self.request.POST.get('start_date', None)
        end_date = self.request.POST.get('end_date', None)

        if name != '' and name != None:
            classes = classes.filter(name=name)
        if coach != '' and coach != None:
            classes = classes.filter(coach=coach)
        
        # refiltering sessions to update for new class filters
        sessions = sessions.filter(classid__in=classes)

        if date1 != '' and date1 != None:
            sessions = sessions.filter(time__date=date1)
        if time != '' and time != None:
            sessions = sessions.filter(time__time=time)
        if start_date != '' and end_date != '' and start_date != None and end_date != None:
            sessions = sessions.filter(time__range=[start_date, end_date])
        
        results = paginator.paginate_queryset(sessions, request)

        serializer = SessionSerializer(results, many=True)
        
        return paginator.get_paginated_response(serializer.data)

    
# class StudioListView(APIView):
#     # serializer_class = StudioSerializer
#     # permission_classes = [IsAuthenticated]
#     pagination_class = LimitOffsetPagination

#     def post(self, request, *args, **kwargs):
#         # extracting latitude and longitude from the request
#         specified_latitude = float(self.request.data['latitude'])
#         specified_longitude = float(self.request.data['longitude'])

#         # getting all the studios
#         queryset = Studio.objects.all()

#         studio_distance = []
#         for studio in queryset:
#             # getting the latitude and longitude of the studio
#             studio_latitude = studio.latitude
#             studio_longitude = studio.longitude

#             # calculating the distance between the specified location and the studio
#             distance = geodesic((specified_latitude, specified_longitude), (studio_latitude, studio_longitude)).miles

#             # appending the distance to the studio_distance list
#             studio_distance.append((studio, distance))
        
#         # sorting the list based on the distance
#         studio_distance.sort(key=lambda x: x[1])

#         # returning the list of studios
#         finallist = []
#         for studio_tuple in studio_distance:
#             studio_details = {}
#             studio_details['name'] = studio_tuple[0].name
#             studio_details['address'] = studio_tuple[0].address
#             studio_details['postalCode'] = studio_tuple[0].postalCode
#             studio_details['latitude'] = studio_tuple[0].latitude
#             studio_details['longitude'] = studio_tuple[0].longitude
#             studio_details['phone'] = studio_tuple[0].phone
#             studio_details['amenities'] = studio_tuple[0].amenities
#             studio_details['id'] = studio_tuple[0].id
#             finallist.append(studio_details)

#         return  JsonResponse(finallist, safe=False)

class StudioListView(APIView, LimitOffsetPagination):
    # serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # extracting latitude and longitude from the request
        specified_latitude = float(self.request.data['latitude'])
        specified_longitude = float(self.request.data['longitude'])

        studios = Studio.objects.all()

        for studio in studios:
            # getting the latitude and longitude of the studio
            studio_latitude = studio.latitude
            studio_longitude = studio.longitude

            # calculating the distance between the specified location and the studio
            distance = geodesic((specified_latitude, specified_longitude), (studio_latitude, studio_longitude)).miles

            # temporarily adding the distance to the studio object
            studio.distance = distance
            studio.save()
        
        # sorting the queryset based on the distance
        studios = studios.order_by('distance')

        self.paginate_queryset(studios, request, view=self)

        serializer = StudioSerializer(studios, many=True)

        return self.get_paginated_response(serializer.data)

        # return studios

# class StudioFilterView(APIView):

#     def post(self, request, *args, **kwargs):
#         # extracting latitude and longitude from the request
#         specified_latitude = float(self.request.data['latitude'])
#         specified_longitude = float(self.request.data['longitude'])
#         name = self.request.data['name']
#         amenity = self.request.data['amenity']
#         class_name = self.request.data['class_name']
#         coach = self.request.data['coach']

#         # getting all the studios
#         queryset = Studio.objects.all()

#         studio_distance = []
#         for studio in queryset:
            
#             #checking filtered name matches with studio name
#             if name != '' and studio.name != name:
#                 continue

#             #checking filtered amenities matches with studio amenities
#             if amenity != '' and studio.amenities.find(amenity) == -1:
#                 continue

#             #checking filtered coach matches with a coach who takes a class in that studio
#             if coach != '':
#                 classes = Class.objects.filter(studio_id=studio.id)
#                 flag = False
#                 for c in classes:
#                     if c.coach == coach:
#                         flag = True
#                         break
#                 if flag == False:
#                     continue
            
#             if class_name != '':
#                 classes = Class.objects.filter(studio_id=studio.id)
#                 flag = False
#                 for c in classes:
#                     if c.name == class_name:
#                         flag = True
#                         break
#                 if flag == False:
#                     continue

#             # getting the latitude and longitude of the studio
#             studio_latitude = studio.latitude
#             studio_longitude = studio.longitude

#             # calculating the distance between the specified location and the studio
#             distance = geodesic((specified_latitude, specified_longitude), (studio_latitude, studio_longitude)).miles

#             # appending the distance to the studio_distance list
#             studio_distance.append((studio, distance))
        
#         # sorting the list based on the distance
#         studio_distance.sort(key=lambda x: x[1])

#         # returning the list of studios
#         finallist = []
#         for studio_tuple in studio_distance:
#             studio_details = {}
#             studio_details['name'] = studio_tuple[0].name
#             studio_details['address'] = studio_tuple[0].address
#             studio_details['postalCode'] = studio_tuple[0].postalCode
#             studio_details['latitude'] = studio_tuple[0].latitude
#             studio_details['longitude'] = studio_tuple[0].longitude
#             studio_details['phone'] = studio_tuple[0].phone
#             studio_details['amenities'] = studio_tuple[0].amenities
#             studio_details['id'] = studio_tuple[0].id
#             finallist.append(studio_details)

#         return  JsonResponse(finallist, safe=False)

class StudioFilterView(APIView, LimitOffsetPagination):
    # serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # extracting latitude and longitude from the request
        specified_latitude = float(self.request.data['latitude'])
        specified_longitude = float(self.request.data['longitude'])
        name = self.request.data['name']
        amenity = self.request.data['amenity']
        class_name = self.request.data['class_name']
        coach = self.request.data['coach']
        
        # getting all the studios
        queryset = Studio.objects.all()
        classes = Class.objects.all()

        for studio in queryset:
            # getting the latitude and longitude of the studio
            studio_latitude = studio.latitude
            studio_longitude = studio.longitude

            # calculating the distance between the specified location and the studio
            distance = geodesic((specified_latitude, specified_longitude), (studio_latitude, studio_longitude)).miles

            # temporarily adding the distance to the studio object
            studio.distance = distance
            studio.save()
        
        # sorting the queryset based on the distance
        queryset = queryset.order_by('distance')

        if name != '':
            queryset = queryset.filter(name=name)
        
        if amenity != '':
            queryset = queryset.filter(amenities__contains=amenity)
        
        if coach != '':
            # classes.filter(coach=coach)
            # queryset.filter(id__in=classes.values('studio_id'))
            queryset = queryset.filter(class__coach=coach)
        
        if class_name != '':
            # classes.filter(name=class_name)
            # queryset.filter(id__in=classes.values('studio_id'))
            queryset = queryset.filter(class__name=class_name)
        
        self.paginate_queryset(queryset, request, view=self)

        serializer = StudioSerializer(queryset, many=True)

        return self.get_paginated_response(serializer.data)
        
        
