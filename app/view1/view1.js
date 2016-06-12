'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$rootScope','transactionAPIHelper','$http',function($scope,transactionAPIHelper,$http) {
	$http.get('http://localhost:8086/lma/getJSONValues').success(function(a){
		console.log(a);
		debugger;
	});
}]);