'use strict';

/**
 * @ngdoc function
 * @name beautyatevesApp.controller:TreatmentsCtrl
 * @description
 * # TreatmentsCtrl
 * Controller of the beautyatevesApp
 */
angular.module('beautyatevesApp')
    .controller('TreatmentsCtrl', function($scope, $http) {
        // $scope.categories = ["Wax", "Nails", "Eyebrows", "Lashes", "Tattoo", "Skin", "Tan", "Makeup", "Botox"]

        $scope.getTreatments = function() {
            $http.get("http://192.168.0.8:86/api/getTreatments").then(function(response) {
                $scope.treatments = response.data
            })
        }

        $scope.getCategories = function() {
            $http.get("http://192.168.0.8:86/api/getTreatmentCats").then(function(response) {
                $scope.categories = response.data
            })
        }
        $scope.selectedCat = 'Wax';

        $scope.getTreatments()
        $scope.getCategories()

        $scope.getAvailability = function(id) {
            $http.get("http://192.168.0.8:86/api/getAvailability?skillID=" + id).then(function(response) {
                $scope.availability = response.data
            })
        }


        $scope.selectCat = (cat) => {
            $scope.selectedCat = cat.name;
        }

        $scope.book = (treatment) => {
            console.log(treatment)
        }

    });