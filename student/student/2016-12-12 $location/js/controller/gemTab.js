	app.controller("ReviewController",function ($scope, $location,ngDialog) {
		this.selectTab = function (setTab) {
			this.tab = setTab;ReviewController
		};
		this.isSelected = function (checkTab) {
			return this.tab === checkTab;
		}
		$scope.product = {
			description:"南美真钻"
		};
		
		
		//初始化
		$scope.reviews = [];
		$scope.review = {
			stars:"",
			body:"",
			author:""
		};
		//提交按钮
		$scope.addReview = function () {
			$scope.reviews.push($scope.review);
			$scope.review = {};
		};
		//编辑按钮
		$scope.editor = function (indexa) {
			//跨页面向URL传值
//			var abc = $scope.reviews[indexa];
//			$location.search({
//				'star':abc.stars,
//				'body':abc.body,
//				'author':abc.author
//			});
//			$location.path('/gemList');

			//不跨页面传值
			$scope.abc = $scope.reviews[indexa];
			
			
			
			
			
			//ngDialog
			$scope.dialog = ngDialog.open({
	                template:'page/gemList.html',
	                controller: 'ListController',
	                scope: $scope,
	                showClose: true,
	                closeByEscape:true,
	                closeByDocument:false
	        });
	        
	        
	        
		};
		
	});
