import { Component, OnInit } from '@angular/core';
import { SensorService } from './sensor.service';

@Component({
    selector: 'sensor-core',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.css'],
    providers: [ SensorService ]
})

export interface Sensor {
    deviceId: string;
    timeStamp: string;
    temperature?: float;
    humidity?: float;
}

export class SensorComponent implements OnInit{

    options: any;
    var baseUri = "https://mattdresser.com:8086/query?db=sustain";

    constructor(private sensorService: SensorService) {}

    ngOnInit()
    {

		var mData = {
			"temperatures": [0],
			"humidities": [0],
			"timeStamps": [0]
			};

		const numDataPts = 500;

		const xAxisData = [];
		const data1 = [];
		const data2 = [];

		this.options = 
		{
			title: {
				text: 'Environment Monitor 1',
			},
			tooltip: {
				trigger: 'axis'
			},
			axisPointer: {
				link: {xAxisIndex: 'all'}
			},
			legend: {
				textStyle: { color: '#eee'},
				data:['Temperature', 'Humidity']
			},
			backgroundColor: '#333',
			grid: [{
				height: '35%'
			},
			{
				height: '35%',
				top: '55%'
			}],
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: mData.timeStamps,
					axisLine: {
						lineStyle: { color: '#bbb' }
					},
					scale: 'true'
				},
				{
					gridIndex: 1,
					type: 'category',
					boundaryGap: false,
					data: mData.timeStamps,
					axisLine: {
						lineStyle: { color: '#bbb' }
					},
					scale: 'true'
				}
			],
			yAxis: [
				{
					name: 'Temperature °F',
					type: 'value',
					lineStyle: { color: '#999'},
					axisLabel: {
						textStyle: { color: '#eee'},
						formatter: '{value} °F'
					},
					axisLine: {
						lineStyle: { color: '#bbb' }
					},
					scale: 'true'
				},
				{
					gridIndex: 1,
					name: 'Humidity %',
					type: 'value',
					lineStyle: { color: '#999'},
					axisLabel: {
						textStyle: { color: '#eee'},
						formatter: '{value} %'
					},
					axisLine: {
						lineStyle: { color: '#bbb' }
					},
					scale: 'true'
				}
			],
			dataZoom: [
				{
					type: 'slider',
					filterMode: 'empty',
					xAxisIndex: [0, 1]
				},
				{
					type: 'slider',
					yAxisIndex: [0],
					filterMode: 'empty'
				},
				{
					type: 'slider',
					yAxisIndex: [1],
					filterMode: 'empty'
				},
				
			],
			series: [
				{
					name:'Temperature',
					type:'line',
					data: mData.temperatures,
					markPoint: {
						data: [
							{type: 'max', name: 'High'},
							{type: 'min', name: 'Low'}
						]
					},
					markLine: {
						data: [
							{type: 'average', name: 'Average'}
						]
					}
				},
				{
					name:'Humidity',
					type:'line',
					xAxisIndex: 1,
					yAxisIndex: 1,
					data:mData.humidities,
					markLine: {
						data: [
							{type: 'average', name: 'Average'}
						]
					}
				}
			]
		};

        this.sensorService.getSensors()
            .subscribe((data: ))

        setInterval(() => {
         //var data = getSensorData();
        }, 5000);
    }
}
