describe('Unit Testing: Angular Bootstrap Feedback - Button', function () {
    var ctrl;
    var controller;
    var scope;
    var test;
    beforeEach(angular.mock.module('angular.bootstrap.feedback'));
    beforeEach(inject(function ($injector, $controller, $q) {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        ctrl = controller(AngularBootstrapFeedback.Button);
        scope.$digest();
        test = controller(AngularBootstrapFeedback.ButtonController, {});
    }));
    it('should exist', function () {
        expect(ctrl).toBeDefined();
        expect(ctrl.templateUrl).toBe('angular.bootstrap.feedback.button.html');
        expect(ctrl.transclude).toBeTruthy();
        expect(ctrl.bindings.options).toBeDefined();
    });
});
