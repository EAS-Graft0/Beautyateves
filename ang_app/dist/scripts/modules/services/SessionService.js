angular.module("webApp").factory("SessionService", [
    "$http",
    "$q",
    function($http, $q) {
        return {
            login: function login(user) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/login",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: user

                }).then(
                    function(res) {

                        deferred.resolve(res.data);

                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            }
        };
    }
]);