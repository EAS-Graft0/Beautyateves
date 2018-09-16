'use strict';

/**
 * @ngdoc function
 * @name beautyatevesApp.controller:StaffCtrl
 * @description
 * # StaffCtrl
 * Controller of the beautyatevesApp
 */
angular.module('beautyatevesApp')
    .controller('StaffCtrl', function($scope, $http) {
        $http.get("http://localhost:86/api/getstaff").then(function(response) {
            var staff = response.data
            for (var s in staff) {
                staff[s].skills = staff[s].skills.split(',')
            }
            $scope.staffMembers = staff
        })
    });