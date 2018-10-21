angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/voucher", {
        title: "voucher",
        templateUrl: "voucher/voucher.html",
        controller: "voucherCtrl"
    })
}])