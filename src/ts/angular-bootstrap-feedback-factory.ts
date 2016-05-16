/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./angular-bootstrap-feedback.ts"/>
/// <reference path="./angular-bootstrap-feedback-modal.ts" />

module AngularBootstrapFeedback {
    export interface IFactory {
        isScreenshotMode:boolean;
        transcludedContent:any;
        // $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,

        screenshotBase64:string;

        // Options
        setOptions(options:IOptions);
        options:IOptions;

        // Selectors
        modalElementSelector:string;
        modalBackdropElementSelector:string;

        // Methods
        openModal();
        hideModal();
        showModal();
        closeModal();
        appendTransclodedContent();

        // Document Events
        setupDocumentEvents();

        // // User Information //
        // getUserAgentInfo();
        // getState();
        // getUrl();

        // Send Feedback Methods //
        showSendFeedback();
        hideSendFeedback();

        // // Screenshot Methods //
        takeScreenshot();
        resetScreenshot();
        destroyCanvas();
        addAlphaBackground();
        //

        // Canvas Methods //
        createCanvas();
    }


    export class Factory {
        static $inject = ['$uibModal', '$document', '$templateCache', '$timeout'];
        static CANVAS_ID:string = 'feedback-canvas';
        static FEEDBACK_HIGHLIGHT_CLASS:string = 'feedback-highlight';

        // Screenshot data //
        isScreenshotMode:boolean;
        $uibModalInstance:ng.ui.bootstrap.IModalServiceInstance;

        screenshotBase64:string;

        // Options
        private options:IOptions = <IOptions>{};

        // HTML Selectors //
        private modalElementSelector:string = 'div[uib-modal-window]';
        private modalBackdropElementSelector:string = 'div[uib-modal-backdrop]';
        private sendFeedbackElementSelector:string = 'div.send-feedback';
        private modalBodyElementSelector:string = `${this.modalElementSelector} .modal-body`;

        // Canvas Methods //
        private ctx;
        private isDrawing:boolean = false;
        private centerX:number;
        private centerY:number;

        // Transclude
        private transcludedContent:any;
        private isOpen:boolean;

        constructor(private $uibModal:ng.ui.bootstrap.IModalService, private $document:ng.IDocumentService, private $templateCache:ng.ITemplateCacheService,
                    private $timeout:ng.ITimeoutService) {
            this.isOpen = false;
        }

        // Send Feedback Methods //
        hideSendFeedback() {
            const sendFeedback = angular.element(this.sendFeedbackElementSelector);
            sendFeedback.addClass('hidden');
        }

        showSendFeedback() {
            const sendFeedback = angular.element(this.sendFeedbackElementSelector);
            sendFeedback.removeClass('hidden');
        }

        // Modal Methods //
        openModal() {
            if (!this.isOpen) {
                this.hideSendFeedback();
                const modalSettings:ng.ui.bootstrap.IModalSettings = {
                    animation: true,
                    size: "lg",
                    template: <string>this.$templateCache.get("angular.bootstrap.feedback.modal.html"),
                    controller: ['angularBootstrapFeedbackFactory', ModalController],
                    controllerAs: '$ctrl'
                };

                this.$uibModalInstance = this.$uibModal.open(modalSettings);
                this.$uibModalInstance.result.then(() => {

                }, () => {
                    if (this.options.modalDismissed) {
                        this.showSendFeedback();
                        this.options.modalDismissed();
                        this.isOpen = false;
                    }
                });

                this.isOpen = true;
            }
        }

        hideModal() {
            if (this.isOpen) {
                const modal = angular.element(this.modalElementSelector);
                const modalBackdrop = angular.element(this.modalBackdropElementSelector);
                modal.addClass('hidden');
                modalBackdrop.addClass('hidden');
                this.isOpen = false;
            }
        }

        showModal() {
            if (!this.isOpen) {
                const modal = angular.element(this.modalElementSelector);
                const modalBackdrop = angular.element(this.modalBackdropElementSelector);
                modal.removeClass('hidden');
                modalBackdrop.removeClass('hidden');
                this.isOpen = true;
            }
        }

        closeModal() {
            if (this.isOpen) {
                this.showSendFeedback();
                this.$uibModalInstance.close();
                this.destroyCanvas();

                if (this.options.modalDismissed) {
                    this.options.modalDismissed();
                }

                this.isOpen = false;
            }
        }

        appendTransclodedContent() {
            this.$timeout(() => {
                const element = angular.element(this.modalBodyElementSelector);
                element.append(this.transcludedContent);
            });
        }

        // Options
        setOptions(options:IOptions) {
            options = options || <IOptions>{};
            this.options = options;
            this.options.modalTitle = options.modalTitle ? options.modalTitle : 'Feedback';
            this.options.takeScreenshotButtonText = options.takeScreenshotButtonText ? options.takeScreenshotButtonText : 'Take Screenshot';
            this.options.submitButtonText = options.submitButtonText ? options.submitButtonText : 'Submit';
            this.options.sendFeedbackButtonText = options.sendFeedbackButtonText ? options.sendFeedbackButtonText : 'Send Feedback';
            this.options.cancelScreenshotOptionsButtonText = options.cancelScreenshotOptionsButtonText ? options.cancelScreenshotOptionsButtonText : 'Cancel';
            this.options.takeScreenshotOptionsButtonText = options.takeScreenshotOptionsButtonText ? options.takeScreenshotOptionsButtonText : 'Take Screenshot';
        }

        // User Information //
        getUserAgentInfo() {
            // const browser: UAParser.IBrowser = this.uaParser.getBrowser();
            // const device: UAParser.IDevice = this.uaParser.getDevice();
            // const cpu: UAParser.ICPU = this.uaParser.getCPU();
            // const engine: UAParser.IEngine = this.uaParser.getEngine();
            // const os: UAParser.IEngine = this.uaParser.getOS();
            //
            // this.userFeedback.browser = browser.name;
            // this.userFeedback.browserVersion = browser.version;
            // this.userFeedback.cpuArchitecture = cpu.architecture;
            // this.userFeedback.deviceType = device.type;
            // this.userFeedback.deviceModel = device.model;
            // this.userFeedback.deviceVendor = device.vendor;
            // this.userFeedback.engineName = engine.name;
            // this.userFeedback.engineVersion = engine.version;
            // this.userFeedback.os = os.name;
            // this.userFeedback.osVersion = os.version;
        }

        // getState() {
        //     this.userFeedback.state = this.$state.current.name;
        //     this.userFeedback.stateParams = JSON.stringify(this.$state.params);
        // }
        //
        // getUrl() {
        //     this.userFeedback.url = this.$location.absUrl();
        // }

        // Screenshot Methods //
        takeScreenshot() {
            var options:Html2Canvas.Html2CanvasOptions = {
                onrendered: canvas => {
                    this.isScreenshotMode = false;
                    this.showModal();
                    this.destroyCanvas();

                    canvas.style.width = '100%';
                    canvas.style.borderRadius = '12px';

                    this.$timeout(() => {
                        this.screenshotBase64 = canvas.toDataURL();
                        if (this.options.screenshotTaken) this.options.screenshotTaken(this.screenshotBase64, canvas);
                    });
                }
            };

            this.hideModal();
            this.hideSendFeedback();

            html2canvas(document.body, options);
        }

        resetScreenshot() {
            this.screenshotBase64 = null;
        }

        destroyCanvas() {
            this.removeDocumentEvents();

            const canvas = angular.element(`#${Factory.CANVAS_ID}`);
            if (canvas) canvas.remove();

            const highlights = angular.element(`.${Factory.FEEDBACK_HIGHLIGHT_CLASS}`);
            highlights.remove();

            this.ctx = null;
        }

        // Document Events //
        setupDocumentEvents() {
            this.$document.on('mousedown', (event) => {
                this.onMouseDown(event);
            });
            this.$document.on('mouseup', (event) => {
                this.onMouseUp(event);
            });
            this.$document.on('mousemove', (event) => {
                this.onMouseMove(event);
            });
        }

        removeDocumentEvents() {
            this.$document.off('mousedown');
            this.$document.off('mouseup');
            this.$document.off('mousemove');
        }

        onMouseDown = (event:any) => {
            this.centerX = event.pageX;
            this.centerY = event.pageY;

            this.ctx.beginPath();

            this.isDrawing = true;

            this.redraw();
        }

        onMouseMove = (event:any) => {
            if (this.isDrawing) {
                const width = event.pageX - this.centerX;
                const height = event.pageY - this.centerY;

                this.ctx.clearRect(0, 0, this.$document.width(), this.$document.height());
                this.addAlphaBackground();
                this.ctx.clearRect(this.centerX, this.centerY, width, height);

                this.redraw();
            }
        }

        onMouseUp = (event:any) => {
            this.isDrawing = false;

            const width = event.pageX - this.centerX;
            const height = event.pageY - this.centerY;

            this.ctx.fillStyle = 'rgba(0,0,0,0)';
            this.ctx.strokeRect(this.centerX, this.centerY, width, height);
            this.ctx.fillRect(this.centerX, this.centerY, width, height);

            const highlight = '<div class="feedback-highlight" style="position:absolute;top:' + this.centerY + 'px;left:' + this.centerX + 'px;width:' + width + 'px;height:' + height + 'px;z-index:30000;"></div>';
            angular.element('body').append(highlight);

            this.redraw();

            if (this.options.highlightDrawn) this.options.highlightDrawn(angular.element(highlight));
        }

        addAlphaBackground() {
            if (!this.ctx) throw Error("User feedback context does not exist");

            this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
            this.ctx.fillRect(0, 0, this.$document.width(), this.$document.height());
        }

        createCanvas() {
            if (!this.ctx) {
                const canvas = `<canvas id="${Factory.CANVAS_ID}"></canvas>`;
                const body = angular.element('body');
                body.append(canvas);
                angular.element(`#${Factory.CANVAS_ID}`).attr({
                    'width': this.$document.width(),
                    'height': this.$document.height(),
                    'style': 'top: 0'
                });
                const canvasElement = <HTMLCanvasElement>document.getElementById(Factory.CANVAS_ID);
                this.ctx = canvasElement.getContext('2d');

                this.setupDocumentEvents();
                this.addAlphaBackground();
            }
        }

        private reset() {
            const canvas = <HTMLCanvasElement>document.getElementById(Factory.CANVAS_ID);
            canvas.width = canvas.width;
        }

        private redraw() {
            const highlights = angular.element(`.${Factory.FEEDBACK_HIGHLIGHT_CLASS}`);

            highlights.each((index, highlight:any) => {
                this.ctx.clearRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
                this.ctx.strokeRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
                this.ctx.fillRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
            });
        }
    }
}

angular.module('angular.bootstrap.feedback').service('angularBootstrapFeedbackFactory', AngularBootstrapFeedback.Factory);
