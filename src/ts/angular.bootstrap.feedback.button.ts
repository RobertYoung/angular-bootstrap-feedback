/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular.bootstrap.feedback.ts"/>

module AngularBootstrapFeedback {

    export class Button implements ng.IComponentOptions {
        public controller: any;
        public template: any;
        public transclude: boolean = true;
        public bindings: any;

        constructor() {
          this.bindings = {
            options: '=?'
          };
          this.controller = ['angularBootstrapFeedbackFactory', '$transclude', ButtonController];
          this.template = ['$templateCache', ($templateCache: ng.ITemplateCacheService): Object => $templateCache.get('angular.bootstrap.feedback.button.html')];
        }
    }

    class ButtonController {
        options: IOptions;

        constructor(private factory: IFactory, private transclude: ng.ITranscludeFunction) {}

        $onInit() {
          this.transclude((value) => {
            this.factory.transcludedContent = value;
          })

          this.factory.setOptions(this.options);
        }

        openModal() {
            this.factory.openModal();
        }

        cancelScreenshotPressed() {
            this.factory.isScreenshotMode = false;
            this.factory.showModal();
            this.factory.destroyCanvas();
        }

        takeScreenshotPressed() {
            this.factory.takeScreenshot();
        }
    }
}
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedback', new AngularBootstrapFeedback.Button());
