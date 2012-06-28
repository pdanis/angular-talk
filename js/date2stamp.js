(function(angular) {

    var app = angular.module('dateApp', []);

    app.filter('date2stamp', function() {
        var stamp;
        return function(value, format) {
            return (value && (stamp = moment(value, format).unix()) > 0 ? stamp : undefined);
        }
    });
    app.filter('stamp2date', function() {
        return function(value, format) {
            return (value ? moment.unix(value).format(format) : '');
        }
    });

    app.directive('dateInput', function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var format = (attrs.dateInput ? attrs.dateInput : 'D.M.YYYY');

                // view => model
                ctrl.$parsers.push(function(value) {
                    return $filter('date2stamp')(value, format);
                });
                // model => view
                ctrl.$formatters.push(function(value) {
                    return $filter('stamp2date')(value, format);
                });
            }
        }
    });

    app.run(function($rootScope) {
        $rootScope.dateF = '01/05/2011';
        $rootScope.dateD = moment().unix();
    });

})(angular);
