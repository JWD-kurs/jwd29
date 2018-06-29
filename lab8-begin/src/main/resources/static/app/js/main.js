var app = angular.module("Wafepa", ["ngRoute"]);

app.controller("ctrl", function($scope){
	$scope.message = "Hello JWD 29!";
});


app.controller("activitiesCtrl", function($scope, $http, $location){
	
	var baseUrl = "/api/activities";
	$scope.activities = [];
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	var getActivities = function(){
		
		var promise = $http.get(baseUrl);
		promise.then(
			function success(res){
				//console.log(res);
				$scope.activities = res.data;
			},
			function error(res){
				alert("Something went wrong!");
			}
		);
	}
	
	//console.log("Test");
	
	getActivities();
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.add = function(){
		var promise = $http.post(baseUrl, $scope.newActivity);
		promise.then(
			function success(res){
				getActivities();
			},
			function error(){
				console.log("Something went wrong!");
			}
		)
	}
});

app.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){
	
	//console.log($routeParams);
	var activityId = $routeParams.aid;
	var baseUrl = "/api/activities";
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		
		$http.get(baseUrl + "/" + activityId).then(
			function success(res){
				$scope.activity = res.data;
			},
			function error(res){
				console.log("Something went wrong!");
			}	
		);
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(baseUrl + "/" + activityId, $scope.activity).then(
			function success(res){
				//alert("Uspeh");
				$location.path("/activities");
			},
			function error(res){
				alert("Something went wrong");
			}
		);
	}
	
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/partial/home.html',
			controller: 'ctrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/partial/activities.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/partial/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);