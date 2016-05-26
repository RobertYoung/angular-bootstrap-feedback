/// <reference path="../../typings/index.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback.factory.ts"/>

describe('Unit Testing: Angular Bootstrap Feedback - Modal', () => {

  var ctrl: any;
  var controller: any;
  var scope: any;
  var factory: AngularBootstrapFeedback.IFactory;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector, $controller, $q) => {
    controller = $controller;

    scope = $injector.get('$rootScope').$new();
    factory = $injector.get('angularBootstrapFeedbackFactory');

    spyOn(factory, 'resetScreenshot');
    spyOn(factory, 'appendTransclodedContent');

    ctrl = new AngularBootstrapFeedback.ModalController(factory, null);

    scope.$digest();
  }));

  it('should exist', () => {
    expect(ctrl).toBeDefined();
    expect(ctrl.resetScreenshot);
    expect(ctrl.appendTransclodedContent);
  });

  it('should close the modal', () => {
    spyOn(factory, 'closeModal');
    ctrl.closeModal();
    expect(factory.closeModal).toHaveBeenCalled();
  });

  it('should submit the form', () => {
    var form: ng.IFormController = {
      $submitted: true
    };

    var opt: AngularBootstrapFeedback.IOptions = {
      submitButtonPressed: (form: ng.IFormController) => {}
    };

    spyOn(opt, 'submitButtonPressed');

    factory.setOptions(opt);
    ctrl.submitButtonPressed(form);
    expect(opt.submitButtonPressed).toHaveBeenCalledWith(form);
  });
});
