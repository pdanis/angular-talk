(function(angular) {

    var app = angular.module('bindApp', []);

    app.controller('defaultCtrl', function($scope) {
        $scope.greeting = 'World';

        $scope.$watch('greeting', function(value) {
            console.log($scope.greeting);
        });
    });

    app.controller('loadCtrl', function($scope, $http) {
        $scope.loading = false;

        /**
         * Loads PHP $_SERVER variable
         */
        $scope.load = function() {
            $scope.loading = true;
            $http.get('srv/_server.php?sleep=2').then(function(response) {
                $scope.server = response.data;
                $scope.loading = false;
            });
        };
    });

})(angular);