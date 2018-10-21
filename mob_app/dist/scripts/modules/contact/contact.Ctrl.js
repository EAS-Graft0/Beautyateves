angular.module('mobApp').controller('contactCtrl', ['$state', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicHistory', '$http', function($state, $scope, $stateParams, $ionicPopup, $ionicModal, $ionicHistory, $http) {
    // window.contact.CtrlScope = $scope;

    $scope.sendMessage = (name, email, message) => {
        if (validateEmail(email)) {
            $http.post('/api/sendMessage', {
                name: name,
                email: email,
                message: message
            }).then((res) => {
                $scope.messageResponse = res.data;
            })
        } else {
        	$scope.messageResponse = 'Invalid Email';
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

}])