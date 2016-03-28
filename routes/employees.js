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
		regions: req.body.regions
	});

	console.log("inside post route: ", newEmployee);

	newEmployee.save()
	.then(function(response){
		console.log("sending response: ", response);
		res.send(response);
	}, next);
});

app.delete('/:id', function(req, res, next){
	console.log("inside delete route: ", req.params.id);
	Employee.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});

app.put('/:id', function(req, res, next){
	console.log("inside put route: ", req.body.regions);
	Employee.findOne({_id: req.params.id})
	.then(function(employee){
		employee.regions = req.body.regions;
		return employee.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});