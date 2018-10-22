describe('Controller: booking', function() {
    beforeEach(module('webAppUI'));
    var bookingCtrl,
        scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        bookingCtrl = $controller('bookingCtrl', {
            $scope: scope
        });
    }));
    it('Should test something in bookingCtrl', function() {
        console.log('Your test for bookingCtrl should be here!!')
    });
});