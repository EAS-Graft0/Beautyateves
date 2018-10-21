angular.module('webApp').directive('login', ['SessionService', '$timeout', '$rootScope', function(SessionService, $timeout, $rootScope) {
    return {
        templateUrl: 'directives/login/login.html',
        scope: {},
        link: function(scope, element, attr) {
            scope.login = ($event, email, password) => {
                if ($event.keyCode == 13) {
                    SessionService.login({
                        "username": email,
                        "password": password
                    }).then((loginResult) => {
                        if (!loginResult.error) {
                            window.sessionStorage.token = loginResult.token;
                            // deferred.resolve(loginResult);
                            $rootScope.login = false;
                        } else {
                            alert(loginResult.error)
                        }
                    })
                } else if ($event.type == 'click') {
                    SessionService.login({
                        "username": email,
                        "password": password
                    }).then((loginResult) => {
                        console.log(loginResult);
                        if (!loginResult.error) {
                            window.sessionStorage.token = loginResult.token;
                            // deferred.resolve(loginResult);
                            $rootScope.login = false;
                        } else {
                            alert(loginResult.error)
                        }
                    })
                }
            }

        }
    };
}]);