(function(angular) {

    var app = angular.module('routingApp', []);
    var routes = ['timeout', 'rss', 'form'];

    app.controller('defaultCtrl', function($scope) {
        $scope.routes = routes;

        // set current route id when route changes
        $scope.$on('$routeChangeSuccess', function(event, route) {
            $scope.current = route.id;
        });
    });

    app.controller('timeoutCtrl', function($scope, $timeout, $routeParams) {
        $scope.timeout = ($routeParams.timeout ? $routeParams.timeout : 30);

        function update() {
            $timeout(function() {
                $scope.timeout--;
                if ($scope.timeout) {
                    update();
                }
            }, 1000);
        }

        update();
    });

    app.controller('rssCtrl', function($scope, $http) {
        $scope.loading = true;
        $http.get('srv/rss.php').then(function(response) {
            $scope.data = response.data;
            $scope.loading = false;
        });
    });

    app.controller('formCtrl', function($scope) {
        $scope.data = {
            name: 'AngularJS',
            description: 'HTML enhanced for web apps!',
            tags: ['data binding', 'html compiler', 'testability']
        };
    });

    app.config(function($routeProvider) {
//        angular.forEach(routes, function(id) {
//            $routeProvider.when('/' + id, {
//                controller: id + 'Ctrl',
//                templateUrl: 'tpl/routing/' + id + '.html',
//                id: id
//            });
//        });
        $routeProvider.when('/timeout/:timeout', { controller: 'timeoutCtrl', templateUrl: 'tpl/routing/timeout.html', id: 'timeout'});
        $routeProvider.when('/rss', { controller: 'rssCtrl', templateUrl: 'tpl/routing/rss.html', id: 'rss'});
        $routeProvider.when('/form', { controller: 'formCtrl', templateUrl: 'tpl/routing/form.html', id: 'form'});

        $routeProvider.otherwise({
            redirectTo: '/timeout/50'
        });
    });

})(angular);