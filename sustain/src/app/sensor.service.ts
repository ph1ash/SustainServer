import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SensorService {

    constructor(private http:HttpClient) {}

    var baseUri = 'https://mattdresser.com:8086/query?db=sustain';

    getDeviceData(device) {
        var queryUri = encodeURI(this.baseUri+'&q=SELECT * FROM "sensor" WHERE "deviceid" =\''+device+'\'');
        coinsole.log(queryUri);
        return this.http.get(queryUri);
    }

    getDeviceList() {
        var queryUri = encodeURI(this.baseUri + '&q=SHOW TAG VALUES WITH KEY = "deviceid"');
        console.log(queryUri);
        return this.http.get(queryUri);
    }
}
