from flask_restful import Resource, reqparse
from appId import AppId
import requests
import json
import numpy as np
import InfluxHandler as handler
import copy

parser = reqparse.RequestParser()
parser.add_argument('appId', type=str)

JSON_TEMPLATE = [
        {
            "measurement": "environment",
            "tags": {
                "deviceID":""
            },
            "fields": {
            }
        }
    ]

class Temperature(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetTemperatureData)

    def post(self):
        # Define argument listener for temperature
        parser.add_argument('value', type=float)
        args = parser.parse_args()
        return ValidateAppIdThenRun(PostDataHandler, 'temperature')

class VOC(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetVOCData)

    def post(self):
        # Define argument listener for VOC
        parser.add_argument('value', type=float)
        args = parser.parse_args()
        return ValidateAppIdThenRun(PostDataHandler, 'tVOC')

class eCO(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetECOData)

    def post(self):
        # Define argument listener for eCO
        parser.add_argument('value', type=float)
        args = parser.parse_args()
        return ValidateAppIdThenRun(PostDataHandler, 'eCO2')

class Humidity(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetHumidityData)

    def post(self):
        # Define argument listener for humidity
        parser.add_argument('value', type=float)
        args = parser.parse_args()
        return ValidateAppIdThenRun(PostDataHandler, 'humidity')

def ValidateAppIdThenRun(functionToCall, field=None):
    args = parser.parse_args()
    if (args['appId'] is not None) and (args['appId'] == AppId.id):
        if (field != None):
            return functionToCall(field)
        else:
            return functionToCall()
    else:
        return {"message": "Invalid App ID provided", "code": "invalidAppId"}

def PostDataHandler(field):
    # Deep copy the JSON_TEMPLATE template
    jsonToPost = copy.deepcopy(JSON_TEMPLATE)

    #Populate the device ID for posting
    jsonToPost[0]['tags']['deviceID'] = AppId.id

    args = parser.parse_args()

    result = False

    # Populate the JSON if we get temperature data
    if (args['value']!=None):
        jsonToPost[0]['fields']={field: args['value']}
        result = handler.write(jsonToPost)
    else:
        # User provided no data for the defined field
        parser.remove_argument('value')
        return "No argument provided", 400

    parser.remove_argument(field)
    if(result):
        return "Entry added", 200
    else:
        return "Failed to add entry to database", 500

def GetTemperatureData():
    return {"I see you want some temperature data": "my dude"}, 200

def GetVOCData():
    return {"I see you want some VOC data": "my dude"}, 200

def GetECOData():
    return {"I see you want some eCO2 data": "my dude"}, 200

def GetHumidityData():
    return {"I see you want some humidity data": "my dude"}, 200

def Initialize(api):
    api.add_resource(Temperature, "/api/temperature")
    api.add_resource(Humidity, "/api/humidity")
    api.add_resource(VOC, "/api/tvoc")
    api.add_resource(eCO, "/api/eco2")
