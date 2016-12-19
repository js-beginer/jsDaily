app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('gemTab', {
			url: '/gemTab',
			templateUrl: 'page/gemTab.html',
			controller: 'ReviewController'
		})
//		.state('gemList', {
//			url: '/gemList',
//			templateUrl: 'page/gemList.html',
//			controller: 'ListController'
//		})
}])