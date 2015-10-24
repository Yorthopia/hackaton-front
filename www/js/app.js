(function () {

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when(
            '/',
            {
                templateUrl: 'views/log/log.html',
                controller: 'checkRouteController'
            }
        )
        .when(
            '/home',
            {
                templateUrl: 'views/home/home.html',
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