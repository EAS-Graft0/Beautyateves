angular.module("mobApp").config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('<%= name %>', {
        url: "/<%= name %>"
        , templateUrl: "<%= name %>/<%= name %>.html"
        , controller: '<%= name %>Ctrl'
    })
})