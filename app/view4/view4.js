'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl',['$rootScope','transactionAPIHelper','$http',function($scope,transactionAPIHelper,$http) {
	var that = this;
		transactionAPIHelper.getCardsData().success(function(data){
			for(var i=0;i<data.length;i++)
				data[i].checkedStatus = true;
			$scope.productsForFinal = data;

		transactionAPIHelper.getFinalData($scope.showPieChart,$scope.productsForFinal);

		});
 	    $scope.showPieChart = function(data,id){
 	    	var data = [{
			        label: "Platinum Card",
			        data: 7
			    }, {
			        label: "Jet Privilege Card",
			        data: 3
			    },{
			        label: "Others",
			        data: 9
			    }];
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
	    	// var data;
	    	// for(var i=0;i<$scope[key].length;i++){
	    	// 	if($scope[key][i].cardId == product.cardId){
	    	// 	   $scope[key][i].checkedStatus = ! product.checkedStatus;
	    	// 	   data = $scope[key].filter(function(a){
	    	// 	   	return a.checkedStatus
	    	// 	   });
	    	// 	   if(key=="productsForFinal")
				  //  	transactionAPIHelper.getFinalData($scope.showPieChart,data);
	    	// 	}
	    	// }	
	    }	
}]);