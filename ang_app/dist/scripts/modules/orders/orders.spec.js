describe('Controller: orders', function() {
    beforeEach(module('webAppUI'));
    var ordersCtrl,
        scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ordersCtrl = $controller('ordersCtrl', {
            $scope: scope
        });
    }));
    it('Should test something in ordersCtrl', function() {
        console.log('Your test for ordersCtrl should be here!!')
    });
});