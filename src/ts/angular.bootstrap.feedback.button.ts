/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular.bootstrap.feedback.ts"/>

module AngularBootstrapFeedback {

    export class Button implements ng.IComponentOptions {
        public controller: any;
        public template: any;

        constructor() {
            // this.controller = ["angularFactory", ButtonController];
            this.controller = [ButtonController];
            this.template = ['$templateCache', ($templateCache: ng.ITemplateCacheService): Object => $templateCache.get('angular.bootstrap.feedback.button.html')];
        }
    }

    class ButtonController {

        // constructor(private factory: IFactory) { }

        // openModal() {
        //     this.factory.openModal();
        // }
        //
        // cancelScreenshotPressed() {
        //     this.factory.isScreenshotMode = false;
        //     this.factory.showModal();
        //     this.factory.destroyCanvas();
        // }
        //
        // takeScreenshotPressed() {
        //     this.factory.takeScreenshot();
        // }
    }
}
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedback', new AngularBootstrapFeedback.Button());
