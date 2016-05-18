/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-button.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-options.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-factory.ts" />

describe('Unit Testing: Angular Bootstrap Feedback - Button', () => {

  var ctrl: any;
  var controller: any;
  var scope: any;
  var test: any;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector, $controller, $q) => {
  		controller = $controller;

  		scope = $injector.get('$rootScope').$new();

  		ctrl = controller(AngularBootstrapFeedback.Button);
  		scope.$digest();

      // var factory = $injector.get('angularBootstrapFeedbackFactory');

      // test = new AngularBootstrapFeedback.ButtonController(factory, null);
  	}));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
    expect(ctrl.templateUrl).toBe('angular.bootstrap.feedback.button.html');
    expect(ctrl.transclude).toBeTruthy();
    expect(ctrl.bindings.options).toBeDefined();
  });
});
