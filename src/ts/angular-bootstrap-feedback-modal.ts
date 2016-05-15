/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular-bootstrap-feedback.ts"/>

module AngularBootstrapFeedback {
    export class ModalController {

        constructor(private factory: IFactory, private $detection : any) {
            // this.factory.getUserFeedbackCategories();
            // this.factory.getMemberDetails();
            this.factory.resetScreenshot();
            // this.factory.userFeedback.userFeedbackCategoryId = null;
            // this.factory.userFeedback = new UserFeedback();
            // this.factory.userFeedback.userFeedbackCategoryId = null;

            this.factory.appendTransclodedContent();
        }

        // Public Methods //
        closeModal() {
            this.factory.closeModal();
        }

        submitButtonPressed(form: ng.IFormController) {
          if (this.factory.options.submitButtonPressed) this.factory.options.submitButtonPressed(form);
            // if (form.$invalid) {
            //     return;
            // }
            //
            // this.factory.getUserAgentInfo();
            // this.factory.getState();
            // this.factory.getUrl();
            // this.factory.postUserFeedback();
        }
    }
}
