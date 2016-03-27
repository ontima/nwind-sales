var app = require('express').Router();
var Employee = require('../db').models.Employee;

module.exports = app;

app.get('/', function(req, res, next){
	Employee.find()
	.then(function(employees){
		res.send(employees);
	}, next);
});


app.post('/', function(req, res, next){
	var newEmployee = new Employee({
		name: req.body.name,
		regions: ['North']
	});
	newEmployee.save()
	.then(function(response){
		res.send(response);
	}, next);
});