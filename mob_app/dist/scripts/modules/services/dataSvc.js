angular.module('mobApp').factory('DataSvc', ['$http', '$q', function($http, $q) {
    return {
        getPlans: function getPlans() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getPlans',
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
        },

        getMeals: function getMeals() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMeals',
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
        },

        getAllergies: function getAllergies() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getAllergies',
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
        },

        getShakes: function getShakes() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getShakes',
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
        },

        getSnacks: function getSnacks() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getSnacks',
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
        },

        getIngredients: function getIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getIngredients',
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
        },

        getMealIngredients: function getMealIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMealIngredients',
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
        },

        getAllergyIngredients: function getAllergyIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getAllergyIngredients',
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
        },

        getMealNutrition: function getMealNutrition() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMealNutrition',
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
        },

        addProject: function addProject(body) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/addProject',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: JSON.stringify(body)
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        }
    }
}])
