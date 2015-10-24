(function () {

    var app = angular.module('app', ['ngRoute', 'request', 'utilities']);

    /*app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.transformRequest = function (data) {
            if (data === undefined) {
                return data;
            }

            return data;
        }
    }])*/

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

    app.controller('checkRouteController', ['$location', '$scope', function ($location, $scope) {
        var user;

        if ($location.path() === "/") {
            localStorage.clear();
        }

        user = sessionStorage.getItem('user') != "undefined" ? JSON.parse(sessionStorage.getItem('user')) : false;


        if (!user) {
            $scope.$on('$locationChangeStart', function (event) {
                event.preventDefault();
            });
        }


    }]);

    app.directive('signup', [function () {
        return {
            restrict: 'A',
            controller: function ($scope, postReq, flash, dataCheck) {
                this.action = function () {
                    console.log($scope.su_username, $scope.su_email, $scope.su_password);
                    var dataSend = {"username": null, "email": null, "password": null},
                        check = dataCheck([$scope.su_username, $scope.su_email, $scope.su_password]);

                    if (!check) {
                        flash("Invalid informations", "warning");
                        return;
                    }

                    dataSend.username = $scope.su_username;
                    dataSend.email = $scope.su_email;
                    dataSend.password = $scope.password;

                    postReq('http://localhost/hackaton/API/signup.php', dataSend, function (data) {
                        console.log(data);
                        if (data.erreur)
                            flash(data.message, "warning");
                        else
                            flash('Inscription validé', "success");
                    });
                };
            },
            controllerAs: "signupCtrl"
        };
    }]);

    app.directive('signin', [function () {
        return {
            restrict: 'A',
            controller: function ($scope, $location, postReq, flash, dataCheck) {
                this.action = function () {
                    var dataSend = {"username": null, "password": null},
                        check = dataCheck([$scope.si_username, $scope.si_password]);

                    if (!check) {
                        flash('Invalid informations', "warning");
                        return;
                    }

                    dataSend.username = $scope.si_username;
                    dataSend.password = $scope.si_password;

                    postReq('http://localhost/hackaton/API/signin.php', dataSend, function (data) {
                        console.log(JSON.parse(data));
                        if (JSON.parse(data).erreur) {
                            flash(JSON.parse(data).message, "warning");
                            return;
                        }

                        sessionStorage.setItem('user', JSON.stringify(data.data));
                        $location.path('/home');
                    });
                };
            },
            controllerAs: "signinCtrl"
        };
    }])

}());