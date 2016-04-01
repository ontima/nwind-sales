
salesApp.controller('EmployeesCtrl', function($scope, EmployeesFactory){

  var resetRegions = function(){
	  $scope.regions = {North: false, South: false, East: false, West: false};
  };

	var getEmployees = function() {
		$scope.displayError = false;
    resetRegions();
		EmployeesFactory.getEmployees()
			.then(function(result){
				$scope.employees = result.data;
			});
	};

	var getSelectedRegions = function() {
		var selected = [];
		for (var region in $scope.regions) {
			if ($scope.regions[region] === true) {
				selected.push(region);
			}
		}
		return selected;
	};

	var setErrorMessage = function(msg) {
		$scope.errorMessage = msg;
		$scope.displayError = true;
	};

	$scope.addEmployee = function() {
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
		EmployeesFactory.deleteEmployee(id)
		.then(function(){
			getEmployees();
		});
	};

	$scope.updateRegion = function(employee, region) {
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

		EmployeesFactory.updateRegion(employee._id, newRegions)
		.then(function(){
			getEmployees();
		});
	};

	getEmployees();

}); 
