angular.module('webApp', ['ngRoute']).factory('sessionInjector', ['$rootScope', '$window', function($rootScope, $window) {
    $rootScope.login = false;
    var sessionInjector = {
        request: function(config) {

            if (window.sessionStorage.token) {
                config.headers['session-token'] = window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.data.action) {
                switch (response.data.action) {
                    case 'login':
                        $rootScope.targetPage = $window.location.href;
                        $window.location.href = '#!/login';
                        break;
                }

            }
            return response;
        }
    };
    return sessionInjector;
}]).config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.otherwise({
        redirectTo: '/admin'
    });
    $httpProvider.interceptors.push('sessionInjector');

}]);