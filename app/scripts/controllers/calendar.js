'use strict';

/**
 * @ngdoc function
 * @name beautyatevesApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the beautyatevesApp
 */
angular.module('beautyatevesApp')
    .controller('CalendarCtrl', function($scope, $http) {

        // $scope.getAvailability = function(id) {
        	// console.log('here')
            $http.get("http://192.168.0.8:86/api/getAvailability?skillID=1").then(function(response) {		
                $scope.availability = response.data
            })
        // }

    });