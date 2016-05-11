/// <reference path="../../typings/main.d.ts"/>
angular.module('angular.bootstrap.feedback', []);
/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular.bootstrap.feedback.ts"/>
var AngularBootstrapFeedback;
(function (AngularBootstrapFeedback) {
    var Button = (function () {
        function Button() {
            // this.controller = ["angularFactory", ButtonController];
            this.controller = [ButtonController];
            this.template = ['$templateCache', function ($templateCache) { return $templateCache.get('angular.bootstrap.feedback.button.html'); }];
        }
        return Button;
    }());
    AngularBootstrapFeedback.Button = Button;
    var ButtonController = (function () {
        function ButtonController() {
        }
        return ButtonController;
    }());
})(AngularBootstrapFeedback || (AngularBootstrapFeedback = {}));
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedback', new AngularBootstrapFeedback.Button());
// ﻿/// <reference path="../../typings/main.d.ts"/>
// /// <reference path="./angular.bootstrap.feedback.ts"/>
//
// module AngularBootstrapFeedback {
//     export interface Ifacatory {
//         isScreenshotMode: boolean;
//         $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
//
//         member: Member;
//         userFeedback: UserFeedback;
//         userFeedbackCategories: Array<EnumObj>;
//         modalElementSelector: string;
//         modalBackdropElementSelector: string;
//
//         // Methods
//         openModal();
//         hideModal();
//         showModal();
//         closeModal();
//
//         // Document Events
//         setupDocumentEvents();
//
//         // Requests //
//         getUserFeedbackCategories(): ng.IPromise<Array<EnumObj>>;
//         postUserFeedback();
//         getMemberDetails();
//
//         // User Information //
//         getUserAgentInfo();
//         getState();
//         getUrl();
//
//         // Screenshot Methods //
//         takeScreenshot();
//         resetScreenshot();
//         destroyCanvas();
//         addAlphaBackground();
//
//         // Canvas Methods //
//         createCanvas();
//     }
//
//
//     export class Factory {
//         static inject = ['$http', '$state', '$templateCache', '$location', '$uibModal', '$timeout', '$document', 'uaParser', 'memberSrv'];
//         static CANVAS_ID: string = 'feedback-canvas';
//         static FEEDBACK_HIGHLIGHT_CLASS: string = 'feedback-highlight';
//
//         // Screenshot data //
//         isScreenshotMode: boolean;
//         $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance;
//
//         // Member Data //
//         private member: Member;
//
//         // Feedback Data //
//         private userFeedback: UserFeedback = new UserFeedback();
//         private userFeedbackCategories: Array<EnumObj>;
//
//         // HTML Selectors //
//         private modalElementSelector: string = 'div[uib-modal-window]';
//         private modalBackdropElementSelector: string = 'div[uib-modal-backdrop]';
//         private sendFeedbackElementSelector: string = 'div.send-feedback';
//
//         // Canvas Methods //
//         private ctx;
//         private isDrawing: boolean = false;
//         private centerX: number;
//         private centerY: number;
//
//         constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $templateCache: ng.ITemplateCacheService,
//             private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService, private $timeout: ng.ITimeoutService,
//             private $document: ng.IDocumentService, private uaParser: UAParser, private memberSrv: IMemberService) {
//         }
//
//         // Send Feedback Methods //
//         hideSendFeedback() {
//             const sendFeedback = angular.element(this.sendFeedbackElementSelector);
//             sendFeedback.addClass('hidden');
//         }
//
//         showSendFeedback() {
//             const sendFeedback = angular.element(this.sendFeedbackElementSelector);
//             sendFeedback.removeClass('hidden');
//         }
//
//         // Modal Methods //
//         openModal() {
//             const modalSettings: ng.ui.bootstrap.IModalSettings = {
//                 animation: true,
//                 size: "lg",
//                 template: <string>this.$templateCache.get("views/modals/brookson.modals.feedback.html"),
//                 controller: ['brooksonUiFeedbackFactory', '$detection', BrooksonModalFeedbackController],
//                 controllerAs: '$ctrl'
//             }
//
//             this.$uibModalInstance = this.$uibModal.open(modalSettings);
//         }
//
//         hideModal() {
//             const modal = angular.element(this.modalElementSelector);
//             const modalBackdrop = angular.element(this.modalBackdropElementSelector);
//             modal.addClass('hidden');
//             modalBackdrop.addClass('hidden');
//         }
//
//         showModal() {
//             const modal = angular.element(this.modalElementSelector);
//             const modalBackdrop = angular.element(this.modalBackdropElementSelector);
//             modal.removeClass('hidden');
//             modalBackdrop.removeClass('hidden');
//         }
//
//         closeModal() {
//             this.$uibModalInstance.close();
//             this.destroyCanvas();
//         }
//
//         // Requests //
//         getUserFeedbackCategories(): ng.IPromise<Array<EnumObj>> {
//             return this.$http.get('api/UserFeedback/GetUserFeedbackCategories').then((response: ng.IHttpPromiseCallbackArg<Array<EnumObj>>) => {
//                 this.userFeedbackCategories = response.data;
//                 return this.userFeedbackCategories;
//             });
//         }
//
//         postUserFeedback() {
//             return this.$http.post('api/UserFeedback/PostUserFeedback', this.userFeedback).then(data => {
//                 if (data) {
//                     this.$uibModalInstance.dismiss();
//                 }
//             });
//         }
//
//         getMemberDetails() {
//             this.memberSrv.getMemberDetails().then(data => {
//                 this.member = data;
//                 this.userFeedback.email = this.member.email;
//             });
//         }
//
//         // User Information //
//         getUserAgentInfo() {
//             const browser: UAParser.IBrowser = this.uaParser.getBrowser();
//             const device: UAParser.IDevice = this.uaParser.getDevice();
//             const cpu: UAParser.ICPU = this.uaParser.getCPU();
//             const engine: UAParser.IEngine = this.uaParser.getEngine();
//             const os: UAParser.IEngine = this.uaParser.getOS();
//
//             this.userFeedback.browser = browser.name;
//             this.userFeedback.browserVersion = browser.version;
//             this.userFeedback.cpuArchitecture = cpu.architecture;
//             this.userFeedback.deviceType = device.type;
//             this.userFeedback.deviceModel = device.model;
//             this.userFeedback.deviceVendor = device.vendor;
//             this.userFeedback.engineName = engine.name;
//             this.userFeedback.engineVersion = engine.version;
//             this.userFeedback.os = os.name;
//             this.userFeedback.osVersion = os.version;
//         }
//
//         getState() {
//             this.userFeedback.state = this.$state.current.name;
//             this.userFeedback.stateParams = JSON.stringify(this.$state.params);
//         }
//
//         getUrl() {
//             this.userFeedback.url = this.$location.absUrl();
//         }
//
//         // Screenshot Methods //
//         takeScreenshot() {
//             var options: Html2Canvas.Html2CanvasOptions = {
//                 onrendered: canvas => {
//                     this.isScreenshotMode = false;
//                     this.showModal();
//                     this.showSendFeedback();
//                     this.destroyCanvas();
//
//                     canvas.style.width = '100%';
//                     canvas.style.borderRadius = '12px';
//
//                     this.$timeout(() => {
//                         this.userFeedback.screenshotBase64 = canvas.toDataURL();
//                     });
//                 }
//             };
//
//             this.hideModal();
//             this.hideSendFeedback();
//             html2canvas(document.body, options);
//         }
//
//         resetScreenshot() {
//             this.userFeedback.screenshotBase64 = null;
//         }
//
//         destroyCanvas() {
//             this.removeDocumentEvents();
//
//             const canvas = angular.element(`#${BrooksonUiFeedbackFactory.CANVAS_ID}`);
//             if (canvas) canvas.remove();
//
//             const highlights = angular.element(`.${BrooksonUiFeedbackFactory.FEEDBACK_HIGHLIGHT_CLASS}`);
//             highlights.remove();
//
//             this.ctx = null;
//         }
//
//         // Document Events //
//         setupDocumentEvents() {
//             this.$document.on('mousedown', (event) => {
//                 this.onMouseDown(event);
//             });
//             this.$document.on('mouseup', (event) => {
//                 this.onMouseUp(event);
//             });
//             this.$document.on('mousemove', (event) => {
//                 this.onMouseMove(event);
//             });
//         }
//
//         removeDocumentEvents() {
//             this.$document.off('mousedown');
//             this.$document.off('mouseup');
//             this.$document.off('mousemove');
//         }
//
//         onMouseDown = (event: any) => {
//             this.centerX = event.pageX;
//             this.centerY = event.pageY;
//
//             this.ctx.beginPath();
//
//             this.isDrawing = true;
//
//             this.redraw();
//         }
//
//         onMouseMove = (event: any) => {
//             if (this.isDrawing) {
//                 const width = event.pageX - this.centerX;
//                 const height = event.pageY - this.centerY;
//
//                 this.ctx.clearRect(0, 0, this.$document.width(), this.$document.height());
//                 this.addAlphaBackground();
//                 this.ctx.clearRect(this.centerX, this.centerY, width, height);
//
//                 this.redraw();
//             }
//         }
//
//         onMouseUp = (event: any) => {
//             this.isDrawing = false;
//
//             const width = event.pageX - this.centerX;
//             const height = event.pageY - this.centerY;
//
//             this.ctx.fillStyle = 'rgba(0,0,0,0)';
//             this.ctx.strokeRect(this.centerX, this.centerY, width, height);
//             this.ctx.fillRect(this.centerX, this.centerY, width, height);
//
//             const highlight = '<div class="feedback-highlight" style="position:absolute;top:' + this.centerY + 'px;left:' + this.centerX + 'px;width:' + width + 'px;height:' + height + 'px;z-index:30000;"></div>';
//             angular.element('body').append(highlight);
//
//             this.redraw();
//         }
//
//         addAlphaBackground() {
//             if (!this.ctx) throw Error("User feedback context does not exist");
//
//             this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
//             this.ctx.fillRect(0, 0, this.$document.width(), this.$document.height());
//         }
//
//         createCanvas() {
//             if (!this.ctx) {
//                 const canvas = `<canvas id="${BrooksonUiFeedbackFactory.CANVAS_ID}"></canvas>`;
//                 const body = angular.element('body');
//                 body.append(canvas);
//                 angular.element(`#${BrooksonUiFeedbackFactory.CANVAS_ID}`).attr({
//                     'width': this.$document.width(),
//                     'height': this.$document.height()
//                 });
//                 const canvasElement = <HTMLCanvasElement>document.getElementById(BrooksonUiFeedbackFactory.CANVAS_ID);
//                 this.ctx = canvasElement.getContext('2d');
//
//                 this.setupDocumentEvents();
//                 this.addAlphaBackground();
//             }
//         }
//
//         private reset() {
//             const canvas = <HTMLCanvasElement>document.getElementById(BrooksonUiFeedbackFactory.CANVAS_ID);
//             canvas.width = canvas.width;
//         }
//
//         private redraw() {
//             const highlights = angular.element(`.${BrooksonUiFeedbackFactory.FEEDBACK_HIGHLIGHT_CLASS}`);
//
//             _.forEach(highlights, highlight => {
//                 this.ctx.clearRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
//                 this.ctx.strokeRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
//                 this.ctx.fillRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
//             });
//         }
//     }
// }
//
// angular.module('angular.bootstrap.feedback').service('brooksonUiFeedbackFactory', Shared.BrooksonUiFeedbackFactory);
// /// <reference path="../../typings/main.d.ts"/>
// /// <reference path="./angular.bootstrap.feedback.ts"/>
//
// module AngularBootstrapFeedback {
//     export class ModalController {
//
//         constructor(private factory: IBrooksonUiFeedbackFactory, private $detection : any) {
//             this.factory.getUserFeedbackCategories();
//             this.factory.getMemberDetails();
//             this.factory.resetScreenshot();
//             this.factory.userFeedback.userFeedbackCategoryId = null;
//             this.factory.userFeedback = new UserFeedback();
//             this.factory.userFeedback.userFeedbackCategoryId = null;
//         }
// 
//         // Public Methods //
//         closeModal() {
//             this.factory.closeModal();
//         }
//
//         submitButtonPressed(form: ng.IFormController) {
//             if (form.$invalid) {
//                 return;
//             }
//
//             this.factory.getUserAgentInfo();
//             this.factory.getState();
//             this.factory.getUrl();
//             this.factory.postUserFeedback();
//         }
//
//         takeScreenshotButtonPressed() {
//             // If mobile, take screenshot only
//             if (this.$detection.isAndroid() || this.$detection.isiOS() || this.$detection.isWindowsPhone() || this.$detection.isBB10()) {
//                 this.factory.takeScreenshot();
//             } else {
//                 this.factory.hideModal();
//                 this.factory.isScreenshotMode = true;
//                 this.factory.createCanvas();
//             }
//         }
//     }
// }
