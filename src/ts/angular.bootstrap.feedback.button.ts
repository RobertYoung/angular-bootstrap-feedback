/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular.bootstrap.feedback.ts"/>

module AngularBootstrapFeedback {

    export class Button implements ng.IComponentOptions {
        public controller: any;
        public templateUrl: any;
        public transclude: boolean = true;
        public bindings: any;

        constructor() {
          this.bindings = {
            options: '=?'
          };
          this.controller = ['angularBootstrapFeedbackFactory', '$transclude', ButtonController];
          this.templateUrl = 'angular.bootstrap.feedback.button.html';
        }
    }

    class ButtonController {
        options: IOptions;

        constructor(private factory: IFactory, private transclude: ng.ITranscludeFunction) {}

        $onInit() {
          this.factory.setOptions(this.options);
        }

        openModal() {
          if (this.options.sendFeedbackButtonPressed) this.options.sendFeedbackButtonPressed();

          this.transclude((value) => {
            this.factory.transcludedContent = value;
          });

          this.factory.openModal();
        }

        cancelScreenshotPressed() {
            if (this.factory.options.cancelScreenshotOptionsButtonPressed) this.factory.options.cancelScreenshotOptionsButtonPressed();

            this.factory.isScreenshotMode = false;
            this.factory.showModal();
            this.factory.destroyCanvas();
        }

        takeScreenshotPressed() {
          if (this.factory.options.takeScreenshotOptionsButtonPressed) this.factory.options.takeScreenshotOptionsButtonPressed();
          this.factory.takeScreenshot();
        }
    }
}
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedback', new AngularBootstrapFeedback.Button());
