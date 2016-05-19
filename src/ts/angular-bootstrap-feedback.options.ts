/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular-bootstrap-feedback.ts"/>

module AngularBootstrapFeedback {
  export interface IOptions {
    // Modal
    modalTitle: string;

    // Button Text
    takeScreenshotButtonText: string;
    submitButtonText:string;
    sendFeedbackButtonText: string;
    cancelScreenshotOptionsButtonText: string;
    takeScreenshotOptionsButtonText: string;

    // Button Events
    takeScreenshotButtonPressed();
    submitButtonPressed(form: ng.IFormController);
    sendFeedbackButtonPressed();
    cancelScreenshotOptionsButtonPressed();
    takeScreenshotOptionsButtonPressed();

    // Screenshot Events
    screenshotTaken(image: string, canvas: HTMLCanvasElement);
    highlightDrawn(element: ng.IAugmentedJQuery);

    // Modal Events
    modalDismissed();
  }
}
