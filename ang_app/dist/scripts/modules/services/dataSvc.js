angular.module("webApp").factory("DataSvc", [
    "$http",
    "$q",
    function($http, $q) {
        return {
            getSnacks: function getSnacks() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getSnacks",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getShakes: function getShakes() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getShakes",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getMeals: function getMeals() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getMeals",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getIngredients: function getIngredients() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getIngredients",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getAllergens: function getAllergens() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getAllergies",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getPlans: function getPlans() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getPlans",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getVouchers: function getVouchers() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getVouchers",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addSnack: function addSnack(snack) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addSnack",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: snack

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addVoucher: function addVoucher(voucher) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addVoucher",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: voucher

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addShake: function addShake(shake) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addShake",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: shake

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addMeal: function addMeal(meal) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addMeal",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: meal

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateMeal: function updateMeal(meal) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateMeal",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: meal

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateShake: function updateShake(shake) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateShake",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: shake

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateSnack: function updateSnack(snack) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateSnack",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: snack

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteShake: function deleteShake(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteShake?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteVoucher: function deleteVoucher(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteVoucher?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteSnack: function deleteSnack(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteSnack?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteMeal: function deleteMeal(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteShake?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addIngredient: function addIngredient(ingredient) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addIngredient",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: ingredient

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateIngredient: function updateIngredient(ingredient) {
                var id = ingredient.id;
                delete ingredient.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateIngredient?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: ingredient

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateVoucher: function updateVoucher(voucher) {
                var id = voucher.id;
                delete voucher.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateVoucher?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: voucher

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteIngredient: function deleteIngredient(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteIngredient?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            logout: function logout() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/logout",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addPlan: function addPlan(plan) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addPlan",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: plan

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updatePlan: function updatePlan(plan) {
                var id = plan.id;
                delete plan.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updatePlan?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: plan

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deletePlan: function deletePlan(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deletePlan?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
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