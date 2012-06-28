(function(angular) {

    var app = angular.module('selectsApp', []);

    app.controller('defaultCtrl', function($scope) {
        $scope.available = [
            { id: 1, label: 'AngularJS' },
            { id: 2, label: 'jQuery' },
            { id: 3, label: 'MooTools' },
            { id: 4, label: 'BackboneJS' },
            { id: 5, label: 'KnockoutJS' }
        ];
        $scope.final = [];
        $scope.selected = {};

        $scope.move = function(from, to) {
            angular.forEach($scope.selected[from], function(selected) {
                $scope[to].push(selected);
                $scope[from] = $scope[from].filter(function(item) {
                    return (item.id !== selected.id);
                });
            });
            $scope.selected = {};
        }
    });

})(angular);
