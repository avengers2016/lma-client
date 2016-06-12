'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$rootScope','transactionAPIHelper','$http',function($scope,transactionAPIHelper,$http) {
transactionAPIHelper.getCardsData().success(function(data){
			for(var i=0;i<data.length;i++)
				data[i].checkedStatus = true;
			$scope.productsForTravel = data;
			$scope.productsForEntertainment = data;
			$scope.productsForFood = data;
			$scope.productsForInsurance = data;
			$scope.productsForFuel = data;

		transactionAPIHelper.getTravelData($scope.showPieChart,data);
	    transactionAPIHelper.getEntertainmentData($scope.showPieChart,data);
	    transactionAPIHelper.getFoodData($scope.showPieChart,data);
	    transactionAPIHelper.getInsuranceData($scope.showPieChart,data);
	    transactionAPIHelper.getFuelData($scope.showPieChart,data);
		});
 	    $scope.showPieChart = function(data,id){
	    	$.plot($(id), data, {
		        series: {
		            pie: {
		                show: true
		            }
		        },
		        grid: {
		            hoverable: true
		        },
		        tooltip: true,
		        tooltipOpts: {
		            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
		            shifts: {
		                x: 20,
		                y: 0
		            },
		            defaultTheme: false
		        }
	    	});
	    }    

	    $scope.productSelected = function(product,key){
	    	var data;
	    	for(var i=0;i<$scope[key].length;i++){
	    		if($scope[key][i].cardId == product.cardId){
	    		   $scope[key][i].checkedStatus = ! product.checkedStatus;
	    		   data = $scope[key].filter(function(a){
	    		   	return a.checkedStatus
	    		   });
	    		   if(key=="productsForTravel")
				   	transactionAPIHelper.getTravelData($scope.showPieChart,data);
				   if(key=="productsForEntertainment")
				   	transactionAPIHelper.getEntertainmentData($scope.showPieChart,data);
				   if(key=="productsForFood")
				   	transactionAPIHelper.getFoodData($scope.showPieChart,data);
				   if(key=="productsForInsurance")
				   	transactionAPIHelper.getInsuranceData($scope.showPieChart,data);
				   if(key=="productsForFuel")
				   	transactionAPIHelper.getFuelData($scope.showPieChart,data);
	    		}
	    	}	
	    }
}]);