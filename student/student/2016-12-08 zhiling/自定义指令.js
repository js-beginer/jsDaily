var app = angular.module('store',[]);
app.directive('productTitle',function () {
	return {
		restrict:'A',
		templateUrl:'product-title.html'
	}
})