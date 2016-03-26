var db = require('../db');
var Employee = db.models.Employee;
var Promise = require('bluebird');

module.exports = function(){
  return db.connect()
    .then(function(conn){
      return conn.sync({force: true}); 
    })
    .then(function(){
      return Promise.join(
        Employee.create({name: 'foo', regions: ['North']}),
        Employee.create({name: 'bar', regions: ['East']}),
        Employee.create({name: 'bazz', regions: ['North', 'West']})
      );
    })
    .then(function(employees){
      return employees;
    });

};
