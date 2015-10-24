(function () {

    var utilities = angular.module('utilities', []);

    utilities.factory('dataCheck', [function () {
        var valid = true;
        return function (data) {
            data.forEach(function (e) {
                if (!typeof e === "string") {
                    if (!e || e === "") {
                        valid = false;
                    }
                }
            });
            return valid;
        };
    }]);

    utilities.factory('flash', ["$timeout", function ($timeout) {
        var div = document.querySelector('.flash');
        return function (message, type) {
            div.innerHTML = message;
            div.style.display = "block";
            if (type === "danger") {
                div.id = "danger";
            }

            if (type === "warning") {
                div.id = "warning";
            }

            if (type === "success") {
                div.id = "success";
            }

            $timeout(function () {
                div.style.display = "none";
            }, 2000);
        }
    }]);

}());