import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Sensor {
    deviceId: string;
    timeStamp: string[];
    temperature?: number[];
    humidity?: number[];
}

@Injectable()
export class SensorService {

    constructor(private http:HttpClient) {}

    baseUri: string = 'https://mattdresser.com:8086/query?db=sustain';

    getDeviceData(device: string) {
        var queryUri = encodeURI(this.baseUri+'&q=SELECT * FROM "sensor" WHERE "deviceid" =\''+device+'\'');
        var response = this.http.get(queryUri);
        return response;
    }

    getDeviceList() {
        var queryUri = encodeURI(this.baseUri + '&q=SHOW TAG VALUES WITH KEY = "deviceid"');
        return this.http.get(queryUri);
    }
}
