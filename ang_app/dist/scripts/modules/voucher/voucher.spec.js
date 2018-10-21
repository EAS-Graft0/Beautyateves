describe('Controller: voucher', function() {
    beforeEach(module('webAppUI'));
    var voucherCtrl,
        scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        voucherCtrl = $controller('voucherCtrl', {
            $scope: scope
        });
    }));
    it('Should test something in voucherCtrl', function() {
        console.log('Your test for voucherCtrl should be here!!')
    });
});