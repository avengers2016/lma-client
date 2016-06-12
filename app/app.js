'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.view5',
  'myApp.version'
]);

app.factory('transactionAPIHelper', function($http) {
	 var transaction = {};
    transaction.getTransactionData = function(){
        return $http.get('/data/transaction_data.json');
    };
    transaction.getCardsData = function(){
        return $http.get('/data/cards_data.json');
    };
    transaction.getPurchaseCategoryData = function(){
        return $http.get('/data/typeofpurchase_data.json');
    };
    transaction.getSalaryData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Salary',function(data){
	    	 	callback(data,"#flot-pie-chart-salary");
	    		});
	    	 });
    }
    transaction.getCreditLimitData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'CreditLimit',function(data){
	    	 	callback(data,"#flot-pie-chart-income");
	    		});
	    	 });	
    },
    transaction.getTravelData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Travel',function(data){
	    	 	callback(data,"#flot-pie-chart-travel");
	    		});
	    	 });	
    },
    transaction.getEntertainmentData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Entertainment',function(data){
	    	 	callback(data,"#flot-pie-chart-entertainment");
	    		});
	    	 });	
    },
    transaction.getFoodData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Food',function(data){
	    	 	callback(data,"#flot-pie-chart-food");
	    		});
	    	 });	
    },
    transaction.getInsuranceData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Insurance',function(data){
	    	 	callback(data,"#flot-pie-chart-insurance");
	    		});
	    	 });	
    },
    transaction.getFuelData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Fuel',function(data){
	    	 	callback(data,"#flot-pie-chart-fuel");
	    		});
	    	 });	
    },
    transaction.getFinalData = function(callback,cardSelected){
    	var that =this,cardDetails = cardSelected;
    		that.getTransactionData().success(function(transactiondata){
	    		that.getEvaluatedData(cardDetails,transactiondata,'Final',function(data){
	    	 	callback(data,"#flot-pie-chart-final");
	    		});
	    	 });	
    },
    transaction.getEvaluatedData =  function(cardDetails,transactiondata,rule,callback){
    	var filteredData = [],count = [],totalCount= 0;
    	var typeOfPurchase = ["Travel","Entertainment","Food","Insurance","Fuel"]	
	    	for(var i=0;i<cardDetails.length;i++){
	    		var k=0;
	    		for(var j=0;j<transactiondata.length;j++){
	    			var sal = parseInt(transactiondata[j].professionalInfo.salary);
	    			if(rule=="CreditLimit"){
	    				if(parseInt(cardDetails[i].commonRules.creditLimitValue)<=parseInt(cardDetails[i].commonRules.creditLimitRatio)*sal)
							k++;	
					}
					if(rule==="Salary"){
						if(parseInt(transactiondata[j].professionalInfo.salary)>=parseInt(cardDetails[i].commonRules.salaryCriteriaValue))
						k++;	
					}
					if(rule==="Travel"){
						if(this.findPurchaseFrequency(cardDetails[i],transactiondata[j],'travel')>=1)
							k++;	
					}
					if(rule==="Entertainment"){
						if(this.findPurchaseFrequency(cardDetails[i],transactiondata[j],'entertainment')>=1)
						k++;							
					}
					if(rule==="Food"){
						if(this.findPurchaseFrequency(cardDetails[i],transactiondata[j],'food')>=1)
						k++;	
					}
					if(rule==="Insurance"){

						if(this.findPurchaseFrequency(cardDetails[i],transactiondata[j],'insurance')>=1)
						k++;	
					}
					if(rule==="Fuel"){

						if(this.findPurchaseFrequency(cardDetails[i],transactiondata[j],'fuel')>=1)
						k++;	
					}
	    		}
	    		if(k>totalCount)
	    			totalCount = k;
	    			count.push(k);
	    			if(rule!=="Final"){
	    				filteredData.push({
		    			label: cardDetails[i].cardName,
		         		data: count[i]
		    			});
	    			}
	    	}
	    	if(typeOfPurchase.indexOf(rule)!==-1){	
	    	filteredData.push({
		           label: "Others",
		           data: 10
		       });	
	    	}
	    	else{
	    	filteredData.push({
		           label: "Others",
		           data: transactiondata.length - totalCount
		       });
	    	}
	    	debugger;

	    	if(rule==="Final"){
	    		callback([{
			        label: "Platinum Card",
			        data: 7
			    }, {
			        label: "Jet Privilege Card",
			        data: 3
			    },{
			        label: "Others",
			        data: 9
			    }]);
	    	}
	    	callback(filteredData); 
    }
    transaction.findPurchaseFrequency = function(card,t,purchaseType){
    				var b=0,tc = t.transactionDetails;
    					if(card.commonRules.typeOfPurchase.indexOf(purchaseType)!==-1){
    					
						for(var a=0; a < tc.length;a++){
							if(tc[a].type==purchaseType)
								b++;
						}

    				}
    	return b;			
    }		
    return transaction;
});


app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
