(function(angular) {

    var app = angular.module('filtersApp', []);

    app.filter('camelize', function() {
        return function(value) {
            return value.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        }
    });
    app.filter('substring', function() {
        return function(value, start, end) {
            return value.substring(start, end);
        }
    });

    app.run(function($rootScope) {
        $rootScope.text = 'Lorem ipsum dolor sit amet';
        $rootScope.arr = ['JavaScript', 'PHP', 'Java', 'Ruby', 'Python'];
    });

})(angular);
