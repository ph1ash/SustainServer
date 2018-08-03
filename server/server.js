var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;
	bodyParser = require('body-parser');
	//getRawBody = require('raw-body');

/*app.use(function (req, res, next) {
	getRawBody(req, {
		length: req.headers['content-length']
})*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/sustainRoutes');
routes(app);

app.listen(port);

console.log('yarp');
