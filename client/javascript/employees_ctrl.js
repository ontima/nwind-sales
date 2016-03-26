
	salesApp.controller('EmployeesCtrl', function($scope, $http, $q){

		$scope.getEmployees = function() {
			console.log("inside controller getEmployees");
			$http.get('/api/employees')
				.then(function(result){
					console.log("showing employees: ", result);
					$scope.employees = result.data;
				});
		};

		$scope.addEmployee = function(employee) {
			console.log("inside controller add: ", $scope.employee);
			$http.post('/api/employees', $scope.employee)
				.then(function(){
					$scope.getEmployees();
				})
				.catch(function(){
					$scope.error = 'Processing error';
				});
		};

	}) //end for controller