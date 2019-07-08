from influxInfo import InfluxInfo as info
from influxdb import InfluxDBClient

client = InfluxDBClient(host=info.host, port=info.port, username=info.user, password=info.pw, database=info.db, ssl=True, verify_ssl=True)

def query():
    return None

def write(jsonData):
    return client.write_points(jsonData)

jsonBody = [
        {
            "measurement": "VOC",
            "tags": {
                "deviceID":"test"
            },
            "fields": {
                "value-1": 10.2,
                "value-2": 22.0
            }
        }
    ]

def testWrite():
    return client.write_points(jsonBody)

if __name__ == '__main__':
    if (testWrite()):
        print("naisu")
