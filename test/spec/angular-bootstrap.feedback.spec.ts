/// <reference path="../../typings/main.d.ts"/>
/// <reference path="../../src/ts/angular-bootstrap-feedback" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-button.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-options.ts" />
/// <reference path="../../src/ts/angular-bootstrap-feedback-factory.ts" />

describe('Angular Bootstrap Feedback', () => {

  var ctrl: any;
  var controller: any;
  var scope: any;

  beforeEach(angular.mock.module('angular.bootstrap.feedback'));

  beforeEach(inject(($injector, $controller, $q) => {
  		controller = $controller;

  		scope = $injector.get('$rootScope').$new();

  		ctrl = controller(AngularBootstrapFeedback.Button, {
  			$scope: scope,
  		});
  		scope.$digest();
  	}));

  it('should exist', () => {
    expect(true).toBe(true);
  });
});
