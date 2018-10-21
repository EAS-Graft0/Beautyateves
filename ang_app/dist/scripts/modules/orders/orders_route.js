angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/orders", {
        title: "orders",
        templateUrl: "orders/orders.html",
        controller: "ordersCtrl"
    })
}])