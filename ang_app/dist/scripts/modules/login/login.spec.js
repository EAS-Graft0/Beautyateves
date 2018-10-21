describe('Controller: login', function() {
    beforeEach(module('webAppUI'));
    var loginCtrl,
        scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        loginCtrl = $controller('loginCtrl', {
            $scope: scope
        });
    }));
    it('Should test something in loginCtrl', function() {
        console.log('Your test for loginCtrl should be here!!')
    });
});