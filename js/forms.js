(function(angular) {

    var app = angular.module('formsApp', []);

    app.controller('defaultCtrl', function($scope, $http) {
        $scope.lists = {
            gender: { male: 'Male', female: 'Female' },
            country: { cz: 'Czech republic', sk: 'Slovakia' }
        };
        $http.get('srv/forms.php').then(function(response) {
            $scope.data = response.data;
        });
    });

    app.directive('emailUnique', function($http, $timeout) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.loading = false;

                var promise = null;

                function validate() {
                    if (promise) {
                        $timeout.cancel(promise);
                    }
                    // delay request
                    promise = $timeout(function() {
                        ctrl.loading = true;
                        $http.get('srv/email_check.php?email=' + encodeURIComponent(ctrl.$viewValue)).then(function(response) {
                            ctrl.$setValidity('unique', response.data === 'true');
                            ctrl.loading = false;
                            promise = null;
                        });
                    }, 500);
                }

                ctrl.$parsers.push(function(value) {
                    validate();
                    return value;
                });
            }
        }
    });

})(angular);