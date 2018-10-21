angular.module('webApp').controller('<%= name %>Ctrl', ['$scope', '$http', function ($scope, $http) {
    window.<%= name %>CtrlScope = $scope
}])