angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/admin", {
        title: "Admin",
        templateUrl: "admin/admin.html",
        controller: "adminCtrl"
    })
}])