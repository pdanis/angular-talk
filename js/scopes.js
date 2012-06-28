(function(angular) {

    var app = angular.module('scopesApp', []);

    app.run(function($rootScope) {
        $rootScope.root = 'root';
    });

    app.controller('oneCtrl', function($scope) {
        $scope.one = 1;
    });

    app.controller('twoCtrl', function($scope) {
        $scope.two = 2;
    });

    app.controller('threeCtrl', function($scope) {
        $scope.three = 3;
        $scope.root = 'three changed root';
    });

})(angular);