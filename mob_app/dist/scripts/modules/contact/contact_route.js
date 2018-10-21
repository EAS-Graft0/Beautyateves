angular.module("mobApp").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.contact', {
        url: "/contact",
        views: {
            'menuContent': {
                templateUrl: "contact/contact.html",
                controller: 'contactCtrl'
            }
        }
    })
})