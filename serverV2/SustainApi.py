from flask_restful import Resource, reqparse
import requests
import json
import numpy as np
from appId import AppId

class Temperature(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetTemperatureData)

    def post(self):
        args = parser.parse_args()

class VOC(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetVOCData)

class Humidity(Resource):
    def get(self):
        return ValidateAppIdThenRun(GetHumidityData)

def ValidateAppIdThenRun(functionToCall):
    parser = reqparse.RequestParser()
    parser.add_argument('appId')
    args = parser.parse_args()
    if (args['appId'] is not None) and (args['appId'] == AppId.id):
        return functionToCall()
    else:
        return {"message": "Invalid App ID provided", "code": "invalidAppId"}

def GetTemperatureData():
    return {"No data yet": "my dude"}, 200

def GetVOCData():
    return {"No data yet": "my dude"}, 200

def GetHumidityData():
    return {"No data yet": "my dude"}, 200

def Initialize(api):
    api.add_resource(Temperature, "/api/temperature")
    api.add_resource(Humidity, "/api/humidity")
    api.add_resource(VOC, "/api/vocs")
