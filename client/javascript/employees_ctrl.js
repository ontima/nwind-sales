
salesApp.controller('EmployeesCtrl', function($scope, $http, $q, EmployeesFactory){

	$scope.regions = {North: false, South: false, East: false, West: false};

	getEmployees = function() {
		$scope.displayError = false;
		$scope.regions = {North: false, South: false, East: false, West: false};
		//$http.get('/api/employees')
		EmployeesFactory.getEmployees()
			.then(function(result){
				console.log("showing employees: ", result.data);
				$scope.employees = result.data;
			});
	};

	getSelectedRegions = function() {
		var selected = [];
		for (var region in $scope.regions) {
			if ($scope.regions[region] === true) {
				selected.push(region);
			}
		}
		return selected;
	};

	setErrorMessage = function(msg) {
		$scope.errorMessage = msg;
		$scope.displayError = true;
	}

	$scope.addEmployee = function() {
		console.log("inside controller add: ", getSelectedRegions());
		var selectedRegions = getSelectedRegions();
		if ($scope.employee === undefined) {
			setErrorMessage("You must supply a name");
			return;
		}
		if (selectedRegions.length === 0) {
			setErrorMessage("You must select at least one region");
			return;
		}
		if (selectedRegions.length === 4) {
			setErrorMessage("A sales person can have at most 3 regions");
			return;
		}

		EmployeesFactory.addEmployee($scope.employee.name, selectedRegions)
		//$http.post('/api/employees', $scope.employee)
			.then(function(){
				getEmployees();
			});
	};

	$scope.isActive = function(employee, region) {
		return employee.regions.indexOf(region) > -1;
	};

	$scope.toggleRegion = function(region){
	    $scope.regions[region] = !$scope.regions[region];
	};
	
	$scope.deleteEmployee = function(id) {
		console.log("inside deleteEmployee: ", id);
		EmployeesFactory.deleteEmployee(id)
		.then(function(){
			getEmployees();
		});
	};

	$scope.updateRegion = function(employee, region) {
		console.log("insdie update region: ", employee);
		console.log("insdie update region: ", region);
		
		var newRegions = employee.regions;
		var index = newRegions.indexOf(region);
		if (index > -1) {
			newRegions.splice(index, 1);
		} else {
			newRegions.push(region);
		}
		if (newRegions.length === 4) {
			setErrorMessage("A sales person can have at most 3 regions");
			return;
		}

		//$scope.regions[region] = !$scope.regions[region];
		EmployeesFactory.updateRegion(employee._id, newRegions)
		.then(function(){
			getEmployees();
		});
	};

	getEmployees();

}) //end for controller