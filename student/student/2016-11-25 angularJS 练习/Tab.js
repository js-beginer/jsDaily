
	var app = angular.module('store',[]);
//	app.controller("PanelController",function () {
////		this.tab = 1;
//		
//		this.selectTab = function (setTab) {
//			this.tab = setTab;ReviewController
//		};
//		this.isSelected = function (checkTab) {
//			return this.tab === checkTab;
//		}
//	})
	
	app.controller('ReviewController',function ($scope) {
		
		
		$scope.reviews = [];
		$scope.review = {
			stars:"",
			body:"",
			author:""
		};
		
		$scope.addReview = function () {
			$scope.reviews.push($scope.review);
			$scope.review = {};
		};
		
//		$timeout(function (){
//			alert ("12345");
//		},500);
		
		
	});
