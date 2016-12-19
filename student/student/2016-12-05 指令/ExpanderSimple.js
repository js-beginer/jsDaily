var expanderModule=angular.module('expanderModule', [])
expanderModule.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
                 + '</div>',
        link : function(scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            }
        }
    }
});
expanderModule.controller('SomeController',function($scope) {
    $scope.title = '点击有惊喜';
    $scope.text = '哈哈哈哈内容在这里！是我是我是我';
});