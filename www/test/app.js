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
          '/home',
          {
              templateUrl: 'view/modules/home/home.html',
              controller: 'homeController.html'
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

    app.controller('userController', [function () {
        // execute au lancement de la page
        this.display = function () {
            //execute quand appele
        };
    }]);

    app.controller('homeController', [function () {
        
    }]);

    app.directive('form', [function () {
        return {
            restrict: 'A', //signifie attribut de balise
            controller: function ($scope) {
                this.signin = function () {
                    $scope.si_username;
                }
            },
            controllerAs: "formCtrl"
        };
    }])

}());
