salesApp.factory('EmployeesFactory', function($http){
	return {
		getEmployees: function(){
			return $http.get('/api/employees');
		},
		addEmployee: function(name, regions){
			var newEmployee = {
				name: name, 
				regions: regions
			}
			return $http.post('/api/employees', newEmployee);
		},
		deleteEmployee: function(id){
			return $http.delete('/api/employees/' + id);
		},
		updateRegion: function(id, regions){
			return $http.put('/api/employees/' + id, {regions: regions});
		}	
	};
});