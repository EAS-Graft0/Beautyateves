angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/login", {
        title: "login",
        templateUrl: "login/login.html",
        controller: "loginCtrl"
    })
}])