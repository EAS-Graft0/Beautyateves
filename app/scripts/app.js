'use strict';

/**
 * @ngdoc overview
 * @name beautyatevesApp
 * @description
 * # beautyatevesApp
 *
 * Main module of the application.
 */
angular
  .module('beautyatevesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/staff', {
        templateUrl: 'views/staff.html',
        controller: 'StaffCtrl',
        controllerAs: 'staff'
      })
      .when('/treatments', {
        templateUrl: 'views/treatments.html',
        controller: 'TreatmentsCtrl',
        controllerAs: 'treatments'
      })
      .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        controllerAs: 'shop'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl',
        controllerAs: 'calendar'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'inventory'
      })
      .when('/rotor', {
        templateUrl: 'views/rotor.html',
        controller: 'RotorCtrl',
        controllerAs: 'rotor'
      })
      .when('/bookings', {
        templateUrl: 'views/bookings.html',
        controller: 'BookingsCtrl',
        controllerAs: 'bookings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
