describe('Angular Bootstrap Feedback', function () {
    var ctrl;
    var controller;
    var scope;
    beforeEach(angular.mock.module('angular.bootstrap.feedback'));
    beforeEach(inject(function ($injector, $controller, $q) {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        ctrl = controller(AngularBootstrapFeedback.Button, {
            $scope: scope,
        });
        scope.$digest();
    }));
    it('should exist', function () {
        console.log(ctrl);
        expect(ctrl).toBeDefined();
    });
});
