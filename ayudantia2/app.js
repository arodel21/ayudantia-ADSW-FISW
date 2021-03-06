var express = require('express');
var ip = require('ip');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var Usuario= require('./models/usuario.js');
var models = require("./models/index.js");


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);


app.use('/',require('./router/routes'));


/*var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));*/

//Express
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


//Routes
app.use('/api', require('./router/api'));

//Start Server
models.sequelize.sync().then(function () {
	var server = app.listen(3000, function () {
		var host = ip.address();
		var port = server.address().port;
		console.log('Example app listening at http://%s:%s', host, port);
	});
});
