angular.module('mobApp', ['ionic', 'ionicUIRouter', 'ionic.native', 'ui.swiper','angularPayments']).config(['$controllerProvider', function($controllerProvider) {
    $controllerProvider.allowGlobals();
}]).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }
            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);
        }]
    };
}]).directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];
            attrs.$observe('hrefInappbrowser', function(val) {
                href = val;
            });
            element.bind('click', function(event) {
                window.open(href, '_system', 'location=yes');
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "sidemenu/user_menu.html",
        controller: 'sidemenuCtrl'
    }).state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
    })
    $urlRouterProvider.otherwise('/home')
})