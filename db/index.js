var Promise = require('bluebird');
var mongoose = require('mongoose');


var employeeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	regions: [String]
});

var Employee = mongoose.model('Employee', employeeSchema);

var _connection;

module.exports = {
  disconnect: function(){
    return new Promise(function(resolve, reject){
      mongoose.disconnect(function(){
        resolve();
      });
    });
  },
  connect: function(){
    if(_connection)
      return _connection;
    _connection =  new Promise(function(resolve, reject){
      mongoose.connect('mongodb://localhost/nwind-sales', function(err){
          if(err)
            return reject(err);
          resolve(mongoose.connection);
      });
    
    });
    return _connection;
  },
  models: {
    Employee: Employee
  }
};