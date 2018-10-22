angular.module("mobApp").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.booking', {
        url: "/booking",
        views: {
            'menuContent': {
                templateUrl: "booking/booking.html",
                controller: 'bookingCtrl'
            }
        }
    })
})