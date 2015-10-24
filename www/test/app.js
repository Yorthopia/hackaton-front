(function () {

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when(
            '/',
            {
                templateUrl: 'views/modules/log/log.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/jobs',
            {
                templateUrl: 'views/modules/jobs/jobs.html',
                controller: 'checkRouteController'
            }
        )
        .otherwise({redirectTo: '/'});
    }]);

    app.controller('checkRouteController', ['$location', function ($location) {
        if ($location.path() === "/") {
            localStorage.clear();
        }
    }]);

}());