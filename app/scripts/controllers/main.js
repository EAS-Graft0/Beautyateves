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

        $http.get("http://localhost:86/api/getOpeningHours").then(function(response) {
            $scope.openingHours = response.data
        })

    });