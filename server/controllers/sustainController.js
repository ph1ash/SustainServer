'use strict';
var cbuffer = require('CBuffer');
var sensorDataBuf = cbuffer(500);

exports.getSensorData = (req, res) => {
	console.log("Get request received");
	res.json(sensorDataBuf);
};

exports.updateSensorData = (req, res) => {
	var newData = req.body;
	var sensor = {
		"temperature": req.body.temp,
		"humidity": req.body.humidity,
		"timeStamp": req.body.time
	}
	sensorDataBuf.push(sensor);
	var latest = sensorDataBuf.end;
	console.log("Latest: " + JSON.stringify(sensorDataBuf.data[latest]));
	res.sendStatus(200);
};
