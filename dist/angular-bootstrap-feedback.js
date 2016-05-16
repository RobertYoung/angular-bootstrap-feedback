/**
 * angular-bootstrap-feedback - User feedback form for angular with screenshot and highlighting
 * @author Robert Young
 * @version v1.0.0
 * @link https://robertyoung.github.io/angular-bootstrap-feedback/
 * @license MIT
 * This file is auto-generated. Please modify the Typescript related file.
 */
angular.module('angular.bootstrap.feedback', [
    'ui.bootstrap'
]);
var AngularBootstrapFeedback;
(function (AngularBootstrapFeedback) {
    var Button = (function () {
        function Button() {
            this.transclude = true;
            this.bindings = {
                options: '=?'
            };
            this.controller = ['angularBootstrapFeedbackFactory', '$transclude', ButtonController];
            this.templateUrl = 'angular.bootstrap.feedback.button.html';
        }
        return Button;
    }());
    AngularBootstrapFeedback.Button = Button;
    var ButtonController = (function () {
        function ButtonController(factory, transclude) {
            this.factory = factory;
            this.transclude = transclude;
        }
        ButtonController.prototype.$onInit = function () {
            this.factory.setOptions(this.options);
        };
        ButtonController.prototype.openModal = function () {
            var _this = this;
            if (this.options.sendFeedbackButtonPressed)
                this.options.sendFeedbackButtonPressed();
            this.transclude(function (value) {
                _this.factory.transcludedContent = value;
            });
            this.factory.openModal();
        };
        ButtonController.prototype.cancelScreenshotPressed = function () {
            if (this.factory.options.cancelScreenshotOptionsButtonPressed)
                this.factory.options.cancelScreenshotOptionsButtonPressed();
            this.factory.isScreenshotMode = false;
            this.factory.showModal();
            this.factory.destroyCanvas();
        };
        ButtonController.prototype.takeScreenshotPressed = function () {
            if (this.factory.options.takeScreenshotOptionsButtonPressed)
                this.factory.options.takeScreenshotOptionsButtonPressed();
            this.factory.takeScreenshot();
        };
        return ButtonController;
    }());
    AngularBootstrapFeedback.ButtonController = ButtonController;
})(AngularBootstrapFeedback || (AngularBootstrapFeedback = {}));
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedback', new AngularBootstrapFeedback.Button());
var AngularBootstrapFeedback;
(function (AngularBootstrapFeedback) {
    var ModalController = (function () {
        function ModalController(factory, $detection) {
            this.factory = factory;
            this.$detection = $detection;
            this.factory.resetScreenshot();
            this.factory.appendTransclodedContent();
        }
        ModalController.prototype.closeModal = function () {
            this.factory.closeModal();
        };
        ModalController.prototype.submitButtonPressed = function (form) {
            if (this.factory.options.submitButtonPressed)
                this.factory.options.submitButtonPressed(form);
        };
        return ModalController;
    }());
    AngularBootstrapFeedback.ModalController = ModalController;
})(AngularBootstrapFeedback || (AngularBootstrapFeedback = {}));
var AngularBootstrapFeedback;
(function (AngularBootstrapFeedback) {
    var Factory = (function () {
        function Factory($uibModal, $document, $templateCache, $timeout) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.$document = $document;
            this.$templateCache = $templateCache;
            this.$timeout = $timeout;
            this.options = {};
            this.modalElementSelector = 'div[uib-modal-window]';
            this.modalBackdropElementSelector = 'div[uib-modal-backdrop]';
            this.sendFeedbackElementSelector = 'div.send-feedback';
            this.modalBodyElementSelector = this.modalElementSelector + " .modal-body";
            this.isDrawing = false;
            this.onMouseDown = function (event) {
                _this.centerX = event.pageX;
                _this.centerY = event.pageY;
                _this.ctx.beginPath();
                _this.isDrawing = true;
                _this.redraw();
            };
            this.onMouseMove = function (event) {
                if (_this.isDrawing) {
                    var width = event.pageX - _this.centerX;
                    var height = event.pageY - _this.centerY;
                    _this.ctx.clearRect(0, 0, _this.$document.width(), _this.$document.height());
                    _this.addAlphaBackground();
                    _this.ctx.clearRect(_this.centerX, _this.centerY, width, height);
                    _this.redraw();
                }
            };
            this.onMouseUp = function (event) {
                _this.isDrawing = false;
                var width = event.pageX - _this.centerX;
                var height = event.pageY - _this.centerY;
                _this.ctx.fillStyle = 'rgba(0,0,0,0)';
                _this.ctx.strokeRect(_this.centerX, _this.centerY, width, height);
                _this.ctx.fillRect(_this.centerX, _this.centerY, width, height);
                var highlight = '<div class="feedback-highlight" style="position:absolute;top:' + _this.centerY + 'px;left:' + _this.centerX + 'px;width:' + width + 'px;height:' + height + 'px;z-index:30000;"></div>';
                angular.element('body').append(highlight);
                _this.redraw();
                if (_this.options.highlightDrawn)
                    _this.options.highlightDrawn(angular.element(highlight));
            };
        }
        Factory.prototype.hideSendFeedback = function () {
            var sendFeedback = angular.element(this.sendFeedbackElementSelector);
            sendFeedback.addClass('hidden');
        };
        Factory.prototype.showSendFeedback = function () {
            var sendFeedback = angular.element(this.sendFeedbackElementSelector);
            sendFeedback.removeClass('hidden');
        };
        Factory.prototype.openModal = function () {
            var _this = this;
            var modalSettings = {
                animation: true,
                size: "lg",
                template: this.$templateCache.get("angular.bootstrap.feedback.modal.html"),
                controller: ['angularBootstrapFeedbackFactory', AngularBootstrapFeedback.ModalController],
                controllerAs: '$ctrl'
            };
            this.$uibModalInstance = this.$uibModal.open(modalSettings);
            this.$uibModalInstance.result.then(function () {
            }, function () {
                if (_this.options.modalDismissed)
                    _this.options.modalDismissed();
            });
        };
        Factory.prototype.hideModal = function () {
            var modal = angular.element(this.modalElementSelector);
            var modalBackdrop = angular.element(this.modalBackdropElementSelector);
            modal.addClass('hidden');
            modalBackdrop.addClass('hidden');
        };
        Factory.prototype.showModal = function () {
            var modal = angular.element(this.modalElementSelector);
            var modalBackdrop = angular.element(this.modalBackdropElementSelector);
            modal.removeClass('hidden');
            modalBackdrop.removeClass('hidden');
        };
        Factory.prototype.closeModal = function () {
            this.$uibModalInstance.close();
            this.destroyCanvas();
            if (this.options.modalDismissed)
                this.options.modalDismissed();
        };
        Factory.prototype.appendTransclodedContent = function () {
            var _this = this;
            this.$timeout(function () {
                var element = angular.element(_this.modalBodyElementSelector);
                element.append(_this.transcludedContent);
            });
        };
        Factory.prototype.setOptions = function (options) {
            options = options || {};
            this.options = options;
            this.options.modalTitle = options.modalTitle ? options.modalTitle : 'Feedback';
            this.options.takeScreenshotButtonText = options.takeScreenshotButtonText ? options.takeScreenshotButtonText : 'Take Screenshot';
            this.options.submitButtonText = options.submitButtonText ? options.submitButtonText : 'Submit';
            this.options.sendFeedbackButtonText = options.sendFeedbackButtonText ? options.sendFeedbackButtonText : 'Send Feedback';
            this.options.cancelScreenshotOptionsButtonText = options.cancelScreenshotOptionsButtonText ? options.cancelScreenshotOptionsButtonText : 'Cancel';
            this.options.takeScreenshotOptionsButtonText = options.takeScreenshotOptionsButtonText ? options.takeScreenshotOptionsButtonText : 'Take Screenshot';
        };
        Factory.prototype.getUserAgentInfo = function () {
        };
        Factory.prototype.takeScreenshot = function () {
            var _this = this;
            var options = {
                onrendered: function (canvas) {
                    _this.isScreenshotMode = false;
                    _this.showModal();
                    _this.showSendFeedback();
                    _this.destroyCanvas();
                    canvas.style.width = '100%';
                    canvas.style.borderRadius = '12px';
                    _this.$timeout(function () {
                        _this.screenshotBase64 = canvas.toDataURL();
                        if (_this.options.screenshotTaken)
                            _this.options.screenshotTaken(_this.screenshotBase64, canvas);
                    });
                }
            };
            this.hideModal();
            this.hideSendFeedback();
            html2canvas(document.body, options);
        };
        Factory.prototype.resetScreenshot = function () {
            this.screenshotBase64 = null;
        };
        Factory.prototype.destroyCanvas = function () {
            this.removeDocumentEvents();
            var canvas = angular.element("#" + Factory.CANVAS_ID);
            if (canvas)
                canvas.remove();
            var highlights = angular.element("." + Factory.FEEDBACK_HIGHLIGHT_CLASS);
            highlights.remove();
            this.ctx = null;
        };
        Factory.prototype.setupDocumentEvents = function () {
            var _this = this;
            this.$document.on('mousedown', function (event) {
                _this.onMouseDown(event);
            });
            this.$document.on('mouseup', function (event) {
                _this.onMouseUp(event);
            });
            this.$document.on('mousemove', function (event) {
                _this.onMouseMove(event);
            });
        };
        Factory.prototype.removeDocumentEvents = function () {
            this.$document.off('mousedown');
            this.$document.off('mouseup');
            this.$document.off('mousemove');
        };
        Factory.prototype.addAlphaBackground = function () {
            if (!this.ctx)
                throw Error("User feedback context does not exist");
            this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
            this.ctx.fillRect(0, 0, this.$document.width(), this.$document.height());
        };
        Factory.prototype.createCanvas = function () {
            if (!this.ctx) {
                var canvas = "<canvas id=\"" + Factory.CANVAS_ID + "\"></canvas>";
                var body = angular.element('body');
                body.append(canvas);
                angular.element("#" + Factory.CANVAS_ID).attr({
                    'width': this.$document.width(),
                    'height': this.$document.height(),
                    'style': 'top: 0'
                });
                var canvasElement = document.getElementById(Factory.CANVAS_ID);
                this.ctx = canvasElement.getContext('2d');
                this.setupDocumentEvents();
                this.addAlphaBackground();
            }
        };
        Factory.prototype.reset = function () {
            var canvas = document.getElementById(Factory.CANVAS_ID);
            canvas.width = canvas.width;
        };
        Factory.prototype.redraw = function () {
            var _this = this;
            var highlights = angular.element("." + Factory.FEEDBACK_HIGHLIGHT_CLASS);
            highlights.each(function (index, highlight) {
                _this.ctx.clearRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
                _this.ctx.strokeRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
                _this.ctx.fillRect(parseInt(highlight.style.left), parseInt(highlight.style.top), parseInt(highlight.style.width), parseInt(highlight.style.height));
            });
        };
        Factory.$inject = ['$uibModal', '$document', '$templateCache', '$timeout'];
        Factory.CANVAS_ID = 'feedback-canvas';
        Factory.FEEDBACK_HIGHLIGHT_CLASS = 'feedback-highlight';
        return Factory;
    }());
    AngularBootstrapFeedback.Factory = Factory;
})(AngularBootstrapFeedback || (AngularBootstrapFeedback = {}));
angular.module('angular.bootstrap.feedback').service('angularBootstrapFeedbackFactory', AngularBootstrapFeedback.Factory);
var AngularBootstrapFeedback;
(function (AngularBootstrapFeedback) {
    var Screenshot = (function () {
        function Screenshot() {
            this.controller = ['angularBootstrapFeedbackFactory', ScreenshotController];
            this.templateUrl = 'angular.bootstrap.feedback.screenshot.html';
        }
        return Screenshot;
    }());
    AngularBootstrapFeedback.Screenshot = Screenshot;
    var ScreenshotController = (function () {
        function ScreenshotController(factory) {
            this.factory = factory;
        }
        ScreenshotController.prototype.takeScreenshotButtonPressed = function () {
            if (this.factory.options.takeScreenshotButtonPressed)
                this.factory.options.takeScreenshotButtonPressed();
            this.factory.hideModal();
            this.factory.isScreenshotMode = true;
            this.factory.createCanvas();
        };
        return ScreenshotController;
    }());
})(AngularBootstrapFeedback || (AngularBootstrapFeedback = {}));
angular
    .module('angular.bootstrap.feedback')
    .component('angularBootstrapFeedbackScreenshot', new AngularBootstrapFeedback.Screenshot());

angular.module("angular.bootstrap.feedback").run(["$templateCache", function($templateCache) {$templateCache.put("angular.bootstrap.feedback.button.html","<div class=\"send-feedback\"><div ng-if=\"!$ctrl.factory.isScreenshotMode\" ng-click=\"$ctrl.openModal()\">{{$ctrl.factory.options.sendFeedbackButtonText}} <span class=\"glyphicon glyphicon-comment\" aria-hidden=\"true\"></span></div><div ng-if=\"$ctrl.factory.isScreenshotMode\"><span>Options</span><div class=\"row\"><div class=\"col-xs-12\"><button class=\"btn btn-danger col-xs-12\" ng-click=\"$ctrl.cancelScreenshotPressed()\">{{$ctrl.factory.options.cancelScreenshotOptionsButtonText}}</button></div></div><div class=\"row\"><div class=\"col-xs-12\"><button class=\"btn btn-success col-xs-12\" ng-click=\"$ctrl.takeScreenshotPressed()\">{{$ctrl.factory.options.takeScreenshotOptionsButtonText}}</button></div></div></div></div>");
$templateCache.put("angular.bootstrap.feedback.modal.html","<form novalidate=\"\" name=\"userFeedbackForm\"><div class=\"modal-header\"><h3 class=\"modal-title pull-left\">{{$ctrl.factory.options.modalTitle}}</h3><a><i class=\"glyphicon glyphicon-remove pull-right add-margin-right-1\" style=\"font-size: 18px\" data-ng-click=\"$ctrl.closeModal(); $event.stopPropagation()\"></i></a></div><div class=\"modal-body\"></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" type=\"submit\" ng-click=\"$ctrl.submitButtonPressed(userFeedbackForm)\">{{$ctrl.factory.options.submitButtonText}}</button></div></form>");
$templateCache.put("angular.bootstrap.feedback.screenshot.html","<div class=\"feedback-screenshot\"><img ng-src=\"{{$ctrl.factory.screenshotBase64}}\"></div><div class=\"btn-toolbar\"><button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.takeScreenshotButtonPressed()\"><span class=\"glyphicon glyphicon-camera\" aria-hidden=\"true\"></span> {{$ctrl.factory.options.takeScreenshotButtonText}}</button></div>");}]);