(function () {

    var app = angular.module('app', ['ngRoute', 'request', 'utilities']);

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

    app.controller('checkRouteController', ['$location', function ($location, $scope) {
        var user;
        if (sessionStorage.getItem('user'))
            user = JSON.parse(sessionStorage.getItem('user'));

        if ($location.path() === "/") {
            localStorage.clear();
        }
        else if (!user.data.id) {
            $scope.$on('$locationChangeStart', function (event) {
                event.preventDefault();
            });
        }


    }]);

    app.directive('signup', [function () {
        return {
            restrict: 'A',
            controller: function () {
                this.action = function ($scope, postReq, flash, dataCheck) {
                    var dataSend = {"username": null, "email": null, "password": null},
                        check = dataCheck([$scope.su_username, $scope.su_email, $scope.su_password]);

                    if (!check) {
                        flash("Invalid informations", "warning");
                        return;
                    }

                    dataSend.username = $scope.su_username;
                    dataSend.email = $scope.su_email;
                    dataSend.password = $.md5($scope.password);

                    $postReq('http://localhost/hackaton/API/signup.php', dataSend, function (data) {
                        console.log(data);
                        if (data.error)
                            flash(data.error_msg, "warning");
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
                        console.log(data);
                        if (data.error) {
                            flash(data.error_msg, "warning");
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