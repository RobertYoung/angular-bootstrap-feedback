/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular.bootstrap.feedback.ts"/>

module AngularBootstrapFeedback {
    export class ModalController {

        constructor(private factory: IFactory, private $detection : any) {
            // this.factory.getUserFeedbackCategories();
            // this.factory.getMemberDetails();
            // this.factory.resetScreenshot();
            // this.factory.userFeedback.userFeedbackCategoryId = null;
            // this.factory.userFeedback = new UserFeedback();
            // this.factory.userFeedback.userFeedbackCategoryId = null;
        }

        // Public Methods //
        closeModal() {
            this.factory.closeModal();
        }

        submitButtonPressed(form: ng.IFormController) {
            if (form.$invalid) {
                return;
            }
            //
            // this.factory.getUserAgentInfo();
            // this.factory.getState();
            // this.factory.getUrl();
            // this.factory.postUserFeedback();
        }

        takeScreenshotButtonPressed() {
            // If mobile, take screenshot only
            // if (this.$detection.isAndroid() || this.$detection.isiOS() || this.$detection.isWindowsPhone() || this.$detection.isBB10()) {
            //     this.factory.takeScreenshot();
            // } else {
            //     this.factory.hideModal();
            //     this.factory.isScreenshotMode = true;
            //     this.factory.createCanvas();
            // }
        }
    }
}
