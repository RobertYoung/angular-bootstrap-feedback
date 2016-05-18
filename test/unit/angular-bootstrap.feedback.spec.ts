/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-button.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-options.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-factory.ts" />

describe('Unit Testing: Angular Bootstrap Feedback - Button', () => {

  var ctrl: any;
  var controller: any;
  var scope: any;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector, $controller, $q) => {
  		controller = $controller;

  		scope = $injector.get('$rootScope').$new();

  		ctrl = controller(AngularBootstrapFeedback.Button);
  		scope.$digest();

  	}));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
    expect(ctrl.templateUrl).toBe('angular.bootstrap.feedback.button.html');
    expect(ctrl.transclude).toBeTruthy();
    expect(ctrl.bindings.options).toBeDefined();
  });
});

describe ('Unit Testing: Angular Bootstrap Feedback - Button Controller', () => {

  var ctrl: AngularBootstrapFeedback.ButtonController;
  var factory: AngularBootstrapFeedback.IFactory;
  var options: AngularBootstrapFeedback.IOptions = <AngularBootstrapFeedback.IOptions>{
    sendFeedbackButtonPressed: () => {}
  };
  var scope: ng.IScope;
  var $transclude: any;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector) => {
      factory = $injector.get('angularBootstrapFeedbackFactory');
      scope = $injector.get('$rootScope').$new();
      $transclude = (cloneAttach: ng.ICloneAttachFunction) => {};

      ctrl = new AngularBootstrapFeedback.ButtonController(factory, $transclude);
      ctrl.options = options;

      spyOn(options, 'sendFeedbackButtonPressed');
      spyOn(factory, 'openModal');
  }));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
    scope.$digest();
    expect(ctrl.options).toBe(options);
  });

  it('should open the modal', () => {
    ctrl.openModal();
    expect(options.sendFeedbackButtonPressed).toHaveBeenCalled();
    expect(factory.openModal).toHaveBeenCalled();
  });
});
