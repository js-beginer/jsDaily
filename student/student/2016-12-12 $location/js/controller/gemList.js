//取值
	app.controller("ListController",function ($scope) {
		//跨页面向URL取值
//		$scope.review = {
//			stars:$location.search()["star"],
//			body:$location.search()["body"],
//			author:$location.search()["author"]
//		}
		//编辑确定按钮
		$scope.review = $scope.$parent.abc;
		
		$scope.reviseText = function () {
			
			
			//关闭窗口
			$scope.$parent.dialog.close();
	        
	        
		};
		
	});
