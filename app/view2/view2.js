'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',['$rootScope','transactionAPIHelper','$http',function($scope,transactionAPIHelper,$http) {
		var that = this;
		transactionAPIHelper.getCardsData().success(function(data){
			for(var i=0;i<data.length;i++)
				data[i].checkedStatus = true;
			$scope.productsForSalary = data;
			$scope.productsForCreditLimit = data;

		transactionAPIHelper.getSalaryData($scope.showPieChart,$scope.productsForSalary);
	    transactionAPIHelper.getCreditLimitData($scope.showPieChart,$scope.productsForCreditLimit);

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
	    		   if(key=="productsForSalary")
				   	transactionAPIHelper.getSalaryData($scope.showPieChart,data);
				   else
				   	transactionAPIHelper.getCreditLimitData($scope.showPieChart,data);
	    		}
	    	}	
	    }	
}]);