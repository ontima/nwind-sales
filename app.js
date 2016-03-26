var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
swig.setDefaults({cache: false });

var models = require('./db').models;
var Product = models.Product;

var app = express();

module.exports = app;

//app.use('/vendor', express.static(path.join(__dirname, 'bower_components')));
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/npm', express.static(path.join(__dirname, 'node_modules')));


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.render('index');
});

app.use('/api/employees', require('./routes/employees'));

// var indexPath = path.join(__dirname, 'views/index.html');
// console.log(indexPath);
// app.get('/*', function(req, res){
//   res.sendFile(app.get('indexPath'));
// });




app.use(function(er, req, res, next){
  res.status(500).send(er);
});