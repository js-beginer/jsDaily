var UserModule = angular.module('UserModule',[]);
UserModule.controller('titleCtrl',['$scope',
	function ($scope) {
		$scope.greeting = {
			title: '双向数据绑定lal'
		};
	}
])

UserModule.controller('UserCtrl',['$scope',
	function ($scope) {
		$scope.userInfo = {
			email: "rubyxiaoxifan@vip.qq.com",
			password: "12343535",
			autoLogin: true
		};
		$scope.getFormData = function () {
			console.log($scope.userInfo);
		};
		$scope.setFormDate = function () {
			$scope.userInfo = {
				email: "709908868@qq.com",
				password: "883311",
				autoLogin: false
			};
		};
		$scope.resetForm = function() {
            $scope.userInfo = {
                email: "",
                password: "",
                autoLogin: false
            };
       };
       $scope.color = "red";
       $scope.getGreen = function () {
       		$scope.color = "green";
       }
		
	}
])

UserModule.controller('errorCtrl', ['$scope',
    function($scope) {
        $scope.isError = false;
        $scope.isWarning = false;
        $scope.Error = function() {
            $scope.messageText = 'This is an error!';
            $scope.isError = true;
            $scope.isWarning = false;
        };
        $scope.Warning = function() {
            $scope.messageText = 'Just a warning. Please carry on.';
            $scope.isWarning = true;
            $scope.isError = false;
        };
    }
])

UserModule.controller('showCtrl', ['$scope',
    function($scope) {
       $scope.menuState={show:false};
        $scope.toggleMenu = function() {
            $scope.menuState.show = !$scope.menuState.show;
        };
    }
])