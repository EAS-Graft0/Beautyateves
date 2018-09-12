'use strict';

/**
 * @ngdoc function
 * @name beautyatevesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beautyatevesApp
 */
angular.module('beautyatevesApp')
    .controller('MainCtrl', function($scope, $http) {

        $http.get("http://192.168.0.8:86/api/getOpeningHours").then(function(response) {
            $scope.openingHours = response.data
        })

    });