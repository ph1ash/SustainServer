import sys
sys.path.append('/var/www/sustain/serverV2')

from flask import Flask
from flask_restful import Api

import SustainApi

application = Flask(__name__)
api = Api(application)

print("Sustain API Initializing")
SustainApi.Initialize(api)

