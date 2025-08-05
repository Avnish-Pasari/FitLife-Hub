#!/usr/bin/env bash
python3 -m pip install virtualenv
python3 -m virtualenv venv
source venv/bin/activate
chmod 777 requirements.txt
pip install -r requirements.txt
chmod 777 manage.py
./manage.py makemigrations
./manage.py migrate
./manage.py createsuperuser
