//function MyContronller ($scope,$timeout) {
//	var updateClock = function () {
//		$scope.clock = new Date();
//		$timeout(function () {
//			updateClock();
//		},1000);
//	}
//	updateClock();
//}

function MyContronller ($scope) {
	$scope.clock = {
		now: new Date()  //这是个对象。。不用；
	};
	var updateClock = function () {
		$scope.clock.now = new Date();
	};
	setInterval(function () {
		$scope.$apply(updateClock);
	},1000);
	updateClock();
};