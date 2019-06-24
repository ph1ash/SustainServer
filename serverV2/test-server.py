from flask import Flask
from flask_restful import Api
import SustainApi

app = Flask(__name__)
api = Api(app)

if __name__ == "__main__":
    SustainApi.Initialize(api)
    app.run(host="0.0.0.0")
