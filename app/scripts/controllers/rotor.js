angular.module('beautyatevesApp')
    .controller('RotorCtrl', function($scope, $http) {

        $scope.rotor = {};
        $scope.temp = [];

        $http.get("http://192.168.0.18:86/api/getRotor").then((result) => {
            for (let i in result.data) {
                result.data[i].date = result.data[i].date.substring(0, 10);
            }
            for (let i in result.data) {
                if (!$scope.rotor[result.data[i].date]) {
                    // console.log('There isnt a ' + result.data[i].date + ' in rotor');
                    $scope.rotor[result.data[i].date] = [];
                } else {
                    // console.log(result.data[i].date + ' is already in rotor');
                }
            }
            for (let i in result.data) {
                for (let j in $scope.rotor) {
                    if (j == result.data[i].date) {
                        // console.log('adding ' + result.data[i].first_name + ' to ' + j);
                        $scope.rotor[j].push({
                            id: result.data[i].staff_id,
                            name: result.data[i].first_name
                        });
                    } else {
                        // console.log('no match')
                    }
                }
            }
        })


        $scope.createSlots = (data) => {
            $http.post("/api/createSlots", data).then((res) => {
                console.log(res)
            })
        }

    });