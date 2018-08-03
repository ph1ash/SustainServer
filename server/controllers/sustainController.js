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
		"lastUpdate": req.body.time
	}
	sensorDataBuf.push(sensor);
	console.log(sensorDataBuf);
	res.sendStatus(200);
};
