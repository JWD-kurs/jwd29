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
	
	$scope.delete = function(id){
		var promise = $http.delete(baseUrl + "/" + id);
		promise.then(
			function success(){
				getActivities();
			},
			function error(){
				alert("Could not delete the activity.");
			}
		);
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


app.controller("standoviCtrl", function($scope, $http){
	
	var baseUrl = "/api/standovi";
	var baseUrlSajmovi = "/api/sajmovi";
	
	$scope.standovi = [];
	$scope.sajmovi = [];
	
	$scope.noviStand = {};
	$scope.noviStand.zakupac = "";
	$scope.noviStand.povrsina = "";
	$scope.noviStand.sajamId = "";
	
	var getStandovi = function(){
		$http.get(baseUrl).then(
			function success(res){
				$scope.standovi = res.data;
			},
			function error(){
				alert("Something went wrong.");
			}
		);
	}
	
	getStandovi();
	
	var getSajmovi = function(){
		$http.get(baseUrlSajmovi).then(
			function success(res){
				$scope.sajmovi = res.data;
			},
			function error(res){
				alert("Something went wrong");
			}
		);
	}
	
	getSajmovi();
	
	$scope.dodaj = function(){
		$http.post(baseUrl, $scope.noviStand).then(
			function success(){
				getStandovi();
			},
			function error(){
				alert("Could not create.")
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
		.when('/standovi', {
			templateUrl : '/app/html/partial/standovi.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);