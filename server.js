var db = require('./db');
//var http = require('http');
var app = require('./app');

db.connect()
	.then(function(){
		console.log("database connected");
		var port = process.env.PORT || 1337;
		app.listen(port, function(){
			console.log("listening on port ", port);
		});
	});