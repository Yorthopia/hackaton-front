(function () {

    var sRequest = angular.module('request', []);

    sRequest.factory('postReq', ['$http', function ($http) {
        return function (url, dataSend, callback) {
            $http.post(url, dataSend)
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                });
        };
    }]);

    sRequest.factory('getReq', ['$http', function ($http) {
        return function (url, dataSend, callback) {
            $http.get(url, dataSend)
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data);
                });
        };
    }])

}());