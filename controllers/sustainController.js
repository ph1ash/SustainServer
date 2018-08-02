'use strict';
var cbuffer = require('CBuffer');
var sensorDataBuf = cbuffer(500);

var sensor = {
	"temperature": 32,
	"humidity": 0,
	"lastUpdate": ""
	}

exports.getSensorData = (req, res) => {
	console.log("Get request received");
	res.json(sensorDataBuf);
};

exports.updateSensorData = (req, res) => {
	var newData = req.body;
	console.log(req.headers);
	//sensor.temperature = req.body.temp;
	//sensor.humidity = req.body.humidity;
	//sensor.lastUpdate = req.body.time;
	//sensorDataBuf.push(sensor);
	res.sendStatus(200);
};
