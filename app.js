var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var models = require('./db').models;
var Product = models.Product;

var app = express();

module.exports = app;

app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/npm', express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/employees', require('./routes/employees'));

var indexPath = path.join(__dirname, 'views/index.html');
console.log(indexPath);
app.get('/*', function(req, res){
  res.sendFile(indexPath);
});


app.use(function(er, req, res, next){
  res.status(500).send(er);
});