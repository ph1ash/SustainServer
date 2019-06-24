const https = require("https"),
	fs = require ("fs"),
	helmet = require("helmet");

const options = {
	key: fs.readFileSync("/etc/letsencrypt/live/sustain.mattdresser.com/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/sustain.mattdresser.com/fullchain.pem")
};

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;
	bodyParser = require('body-parser');
	//getRawBody = require('raw-body');

/*app.use(function (req, res, next) {
	getRawBody(req, {
		length: req.headers['content-length']
})*/

app.use(helmet());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/sustainRoutes');
routes(app);

https.createServer(options, app).listen(port);

console.log('Starting Sustain Server');
