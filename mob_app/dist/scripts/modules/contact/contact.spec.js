describe('Controller: contact', function() {
    beforeEach(module('webAppUI'));
    var contactCtrl,
        scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        contactCtrl = $controller('contactCtrl', {
            $scope: scope
        });
    }));
    it('Should test something in contactCtrl', function() {
        console.log('Your test for contactCtrl should be here!!')
    });
});