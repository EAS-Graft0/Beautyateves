angular.module('mobApp').factory('CustomPlanSvc', ['$http', '$q', function($http, $q) {
    return {
        generatePlan: function generatePlan(bmr,goal,ingredients) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/generatePlan?bmr=' + bmr+'&goal='+goal+'&ingredients='+ingredients,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        }
    }
}])
