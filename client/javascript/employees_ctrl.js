
	salesApp.controller('EmployeesCtrl', function($scope, $http, $q){
		function showEmployees() {
			$http.get('/api/employees')
				.then(function(result){
					console.log("showing employees: ", result);
					$scope.employees = result.data;
				});
		}

		$scope.add = function(employee) {
			console.log("inside controller add: ", $scope.employee);
			$http.post('/api/employees', $scope.employee)
				.then(function(){
					showEmployees();
				})
				.catch(function(){
					$scope.error = 'Processing error';
				});
		};

	}) //end for controller