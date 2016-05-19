/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.button.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.options.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.factory.ts" />

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
  var $componentController: angular.IComponentControllerService;
  var factory: AngularBootstrapFeedback.IFactory;
  var options: AngularBootstrapFeedback.IOptions = <AngularBootstrapFeedback.IOptions>{
    sendFeedbackButtonPressed: () => {},
    cancelScreenshotOptionsButtonPressed: () => {}
  };
  var scope: ng.IScope;
  var $transclude: any;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector, _$componentController_) => {
    $componentController = _$componentController_;
    factory = $injector.get('angularBootstrapFeedbackFactory');
    scope = $injector.get('$rootScope').$new();
    $transclude = (cloneAttach: ng.ICloneAttachFunction) => {};

    ctrl = $componentController<AngularBootstrapFeedback.ButtonController, any>(
              "angularBootstrapFeedback",
              {
                $scope: <ng.IScope>{} ,
                $transclude: $transclude,
                factory: factory
              });

    ctrl.options = options;

    spyOn(options, 'sendFeedbackButtonPressed');
    spyOn(options, 'cancelScreenshotOptionsButtonPressed');
    spyOn(factory, 'openModal');
    spyOn(factory, 'showModal');
    spyOn(factory, 'destroyCanvas');
    spyOn(factory, 'setOptions').and.callThrough();
  }));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
    ctrl.$onInit();
    expect(factory.setOptions).toHaveBeenCalledWith(options);
  });

  it('should open the modal', () => {
    ctrl.$onInit();
    ctrl.openModal();
    expect(factory.options.sendFeedbackButtonPressed).toHaveBeenCalled();
    expect(factory.openModal).toHaveBeenCalled();
  });

  it('should cancel the screenshot', () => {
    ctrl.$onInit();
    ctrl.cancelScreenshotPressed();
    expect(options.cancelScreenshotOptionsButtonPressed).toHaveBeenCalled();
    expect(factory.isScreenshotMode).toBeFalsy();
    expect(factory.showModal).toHaveBeenCalled();
    expect(factory.destroyCanvas).toHaveBeenCalled();
  });
});
