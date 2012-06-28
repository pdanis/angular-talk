(function(angular) {

    var app = angular.module('repeatApp', []);

    app.controller('defaultCtrl', function($scope) {
        $scope.data = {
            num: [1, 2, 3],
            ltr: ['a', 'b', 'c']
        };
        /**
         * Adds random data item by type
         * @param type
         */
        $scope.add = function(type) {
            var x = Math.floor(Math.random() * 20) + 1;
            $scope.data[type].push(type === 'ltr' ? String.fromCharCode(65 + x) : x);
        };
        /**
         * Removes data item by type
         * @param type
         */
        $scope.del = function(type) {
            $scope.data[type].pop();
        };
    });

})(angular);
