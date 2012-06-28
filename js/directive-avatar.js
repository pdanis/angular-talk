(function(angular) {

    var app = angular.module('avatarApp', []);

    app.controller('defaultCtrl', function($scope) {
        $scope.users = [];
    });

    app.directive('avatar', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<a href="http://www.csfd.cz/uzivatel/{{uid}}">' +
                '<img ng-src="http://img.csfd.cz/images/users/foto{{uid}}.jpg" onerror="console.warn(\'Avatar {{uid}} not found\')"/>' +
                '</a>',
            scope: {
                uid: '@'
            }
        }
    });

})(angular);
