angular.module('webApp').controller('loginCtrl', ['$scope', '$http', 'SessionService', '$window', '$rootScope', function($scope, $http, SessionService, $window, $rootScope) {
    window.loginCtrlScope = $scope
    $scope.login = ($event, email, password) => {
        if ($event.keyCode == 13) {
            SessionService.login({
                "username": email,
                "password": password
            }).then((loginResult) => {
                if (!loginResult.error) {
                    window.sessionStorage.token = loginResult.token;
                    // deferred.resolve(loginResult);
                    // $rootScope.login = false;
                    $window.location.href = $rootScope.targetPage
                } else {
                    alert(loginResult.error)
                }
            })
        } else if ($event.type == 'click') {
            SessionService.login({
                "username": email,
                "password": password
            }).then((loginResult) => {
                // console.log(loginResult);
                if (!loginResult.error) {
                    window.sessionStorage.token = loginResult.token;
                    // deferred.resolve(loginResult);
                    // $rootScope.login = false;
                    $window.location.href = loginResult.location
                } else {
                    alert(loginResult.error)
                }
            })
        }
    }
}])