var app = require('express').Router();
var Employee = require('../db').models.Employee;

module.exports = app;

app.get('/', function(req, res, next){
	Employee.findAll({})
	.then(function(employees){
		res.send(employees);
	}, next);
});


app.post('/', function(req, res, next){
	var newEmployee = new Employee({
		name: req.body.name,
		regions: ['North']
	});

	console.log("inside post: ", newEmployee);

	newEmployee.save()
	.then(function(response){
		res.send(response);
	}, next);

	// Employee.create(req.body)
	// .then(function(employee){
	// 	res.send(employee);
	// }, function() {
	// 	res.sendStatus(404);
	// }, next);
});