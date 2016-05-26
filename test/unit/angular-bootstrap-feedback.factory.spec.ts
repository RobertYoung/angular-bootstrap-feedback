/// <reference path="../../typings/index.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.button.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.options.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback.factory.ts" />

describe('Unit Testing: Angular Bootstrap Feedback - Factory', () => {

  var factory: any;
  var elementSpy;
  var $uibModal:ng.ui.bootstrap.IModalService;
  var $document:ng.IDocumentService
  var $templateCache:ng.ITemplateCacheService
  var $timeout:ng.ITimeoutService;
  var mockElement: ng.IAugmentedJQuery = <ng.IAugmentedJQuery>{
    addClass: (className: string) => {return null},
    removeClass: (className: string) => {return null},
    remove: () => {}
  };

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(angular.mock.inject(($injector, $uibModal, $document, $templateCache, $timeout) => {
    factory = new AngularBootstrapFeedback.Factory($uibModal, $document, $templateCache, $timeout);
  }));

  beforeEach(() => {
    spyOn(mockElement, 'addClass');
    spyOn(mockElement, 'removeClass');
    elementSpy = spyOn(angular, 'element').and.returnValue(mockElement);
  });

  afterEach(function() {
      elementSpy.and.callThrough();
  });

  it('should exist', () => {
    expect(factory).toBeDefined();
  });

  it('should hide the send feedback button', () => {
    factory.hideSendFeedback();
    expect(angular.element).toHaveBeenCalled();
    expect(mockElement.addClass).toHaveBeenCalledWith('hidden');
  });

  it('should show the send feedback button', () => {
    factory.showSendFeedback();
    expect(angular.element).toHaveBeenCalled();
    expect(mockElement.removeClass).toHaveBeenCalledWith('hidden');
  });

  it('should open the modal if it is not open', () => {
    spyOn(factory, 'hideSendFeedback');
    factory.isOpen = false;
    factory.openModal();
    expect(factory.hideSendFeedback).toHaveBeenCalled();
    expect(factory.isOpen).toBeTruthy();
  });

  it('should not open the modal if it is already open', () => {
    spyOn(factory, 'hideSendFeedback');
    factory.isOpen = true;
    factory.openModal();
    expect(factory.hideSendFeedback).not.toHaveBeenCalled();
    expect(factory.isOpen).toBeTruthy();
  });

  it('should close the modal', () => {
    factory.openModal();
    factory.options.modalDismissed = () => {};
    spyOn(factory.options, 'modalDismissed');
    factory.isOpen = true;
    factory.closeModal();
    expect(factory.options.modalDismissed).toHaveBeenCalled();
  });

  it('should set the options if provided', () => {
    let opt = {
      modalTitle: "modalTitle",
      takeScreenshotButtonText: "takeScreenshotButtonText",
      submitButtonText: "submitButtonText",
      sendFeedbackButtonText: "sendFeedbackButtonText",
      cancelScreenshotOptionsButtonText: "cancelScreenshotOptionsButtonText",
      takeScreenshotOptionsButtonText: "takeScreenshotOptionsButtonText",

      // Button Events
      takeScreenshotButtonPressed: () => {},
      submitButtonPressed: (form: ng.IFormController) => {},
      sendFeedbackButtonPressed: () => {},
      cancelScreenshotOptionsButtonPressed: () => {},
      takeScreenshotOptionsButtonPressed: () => {},

      // Screenshot Events
      screenshotTaken: (image: string, canvas: HTMLCanvasElement) => {},
      highlightDrawn: (element: ng.IAugmentedJQuery) => {},

      // Modal Events
      modalDismissed: () => {}
    };

    factory.setOptions(opt);
    expect(factory.options).toBe(opt);
  });

  it('should set the default options', () => {
    factory.setOptions({});
    expect(factory.options.modalTitle).toBe('Feedback');
    expect(factory.options.takeScreenshotButtonText).toBe('Take Screenshot');
    expect(factory.options.submitButtonText).toBe('Submit');
    expect(factory.options.sendFeedbackButtonText).toBe('Send Feedback');
    expect(factory.options.cancelScreenshotOptionsButtonText).toBe('Cancel');
    expect(factory.options.takeScreenshotOptionsButtonText).toBe('Take Screenshot');
  });

  it('should take a screenshot', () => {
    spyOn(factory, 'hideModal');
    spyOn(factory, 'hideSendFeedback');

    factory.takeScreenshot();

    expect(factory.hideModal).toHaveBeenCalled();
    expect(factory.hideSendFeedback).toHaveBeenCalled();
  });

  it('should reset the screenshot', () => {
    factory.screenshotBase64 = "abc";
    factory.resetScreenshot();
    expect(factory.screenshotBase64).toBe(null);
  });

  
});
