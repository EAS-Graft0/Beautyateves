angular.module('mobApp').controller('sidemenuCtrl',["$state", "$scope","$ionicModal","$ionicPopup", function ($state, $scope, $ionicModal, $ionicPopup) {

  $scope.modals = {};
  $scope.showPopup = function() {
    $scope.alertPopup = $ionicPopup.alert({
      title: 'Phone',
      template: '075 8741 2891',
      cssClass: 'contactPopup'
    })
  }

  $scope.showAbout = function () {
  $ionicModal.fromTemplateUrl('builder/about_modal.html', {
      scope: $scope
      ,animation: 'slide-in-left'
    }).then(function (modal) {
      $scope.modals.aboutModal = modal;
      $scope.modals.aboutModal.show();
    });
  }

  $scope.showTerms = function () {
  $ionicModal.fromTemplateUrl('builder/terms_modal.html', {
      scope: $scope
      , animation: 'slide-in-left'
    }).then(function (modal) {
      $scope.modals.termModal = modal;
      $scope.modals.termModal.show();
    });
  }

  $scope.showContact = function () {
  $ionicModal.fromTemplateUrl('builder/contact_modal.html', {
    scope: $scope
    , animation: 'slide-in-left'
  }).then(function (modal) {
    $scope.modals.contactModal = modal;
    $scope.modals.contactModal.show();
    });
  }

  $scope.showKitchen = function () {
  $ionicModal.fromTemplateUrl('builder/kitchen_modal.html', {
    scope: $scope
    , animation: 'slide-in-left'
  }).then(function (modal) {
    $scope.modals.kitchenModal = modal;
    $scope.modals.kitchenModal.show();
  });
  }
}])
