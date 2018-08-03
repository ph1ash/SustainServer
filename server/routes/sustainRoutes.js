'use strict';
module.exports = (app) => {
	var sustain = require('../controllers/sustainController');

	app.route('/sustain')
		.get(sustain.getSensorData)
		.post(sustain.updateSensorData);
};
