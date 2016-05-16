# angular-bootstrap-feedback
[![GitHub version](https://badge.fury.io/gh/RobertYoung%2Fangular-bootstrap-feedback.svg)](https://badge.fury.io/gh/RobertYoung%2Fangular-bootstrap-feedback)
[![Bower version](https://badge.fury.io/bo/angular-feedback.svg)](http://badge.fury.io/bo/angular-feedback)
[![Build Status](https://travis-ci.org/andreipfeiffer/angular-feedback.svg?branch=master)](https://travis-ci.org/andreipfeiffer/angular-feedback)
[![Coverage Status](https://coveralls.io/repos/github/RobertYoung/angular-bootstrap-feedback/badge.svg?branch=master)](https://coveralls.io/github/RobertYoung/angular-bootstrap-feedback?branch=master)

# Overview
A user feedback modal with screenshot and highlighting functionality built around Angular 1.5+.
##### Features
* Angular component(s)
* Modal popup
* User can create Screenshots
* User can highlight screenshots
* Include custom inputs

[View Demo](https://robertyoung.github.io/angular-bootstrap-feedback/)

#### Requirements
* **angular** - 1.5.0+
* **bootstrap** - 3.3.6+
* **angular-bootstrap** - 1.3.2+
* **html2canvas** - 0.4.1+

# Installation
#### Bower
    bower install angular-bootstrap-feedback --save
#### Manual
Or, you can download source files straight from this repo, they're located in the `dist` folder.
Just include the minified version of both `.js` and `.css` files.
* dist/angular-bootstrap-feedback-styles.css
* dist/angular-bootstrap-feedback.js

###### Or, Minified
* dist/angular.bootstrap.feedback.min.css
* dist/angular.bootstrap.feedback.min.js


# Usage
Make sure you have the required bower_components and included them in your html page as well as the angular-bootstrap-feedback files:

#### 1. Injection
Inject the angular.bootstrap.feedback provider into your module
```javascript
    var myApp = angular.module('myApp', [
        'angular.bootstrap.feedback'
    ]);
```

#### 2. Options    
Create an options object on the controller. All options are optional, see below for a detailed explanation of each property.

```javascript
    myApp.controller('appController', ['angularBootstrapFeedbackFactory',

    function(feedbackFactory) {
        $scope.options = {
          modalTitle: 'Feedback',
          takeScreenshotButtonText: "Take screenshot",
          submitButtonText: "Submit",
          sendFeedbackButtonText: "Send Feedback",
          cancelScreenshotOptionsButtonText: "Cancel",
          takeScreenshotOptionsButtonText: "Take Screenshot",
          takeScreenshotButtonPressed: takeScreenshotButtonPressed,
          submitButtonPressed: submitButtonPressed,
          sendFeedbackButtonPressed: sendFeedbackButtonPressed,
          cancelScreenshotOptionsButtonPressed: cancelScreenshotOptionsButtonPressed,
          takeScreenshotOptionsButtonPressed: takeScreenshotOptionsButtonPressed,
          screenshotTaken: screenshotTaken,
          highlightDrawn: highlightDrawn,
          modalDismissed: modalDismissed
        }

        function takeScreenshotButtonPressed() {}
        function submitButtonPressed(form) {}
        function sendFeedbackButtonPressed() {}
        function cancelScreenshotOptionsButtonPressed() {}
        function takeScreenshotOptionsButtonPressed() {}
        function screenshotTaken(image, canvas) {}
        function highlightDrawn(element) {}
        function modalDismissed() {}
    }]);
```

#### 3. Setup HTML    
The angular components are split into 2 elements:
* angular-bootstrap-feedback
* angular-bootstrap-feedback-screenshot

*Please note, the screenshot component is not required.*
``` html
    <angular-bootstrap-feedback options="options">
        <div class="row">
          <div class="col-lg-6">
            // Your custom inputs here
          </div>

          <div class="col-lg-6">
            <angular-bootstrap-feedback-screenshot></angular-bootstrap-feedback-screenshot>
          </div>
        </div>
      </angular-bootstrap-feedback>
```

# Options
#### Text properties
|Property|Description|Default|
|:-------------|:-----------------------|------:|
|modalTitle|Sets the title of the modal|**'Feedback'**|
|submitButtonText|Sets the submit button value of the modal|**'Submit'**|
|takeScreenshotButtonText|Sets the button text value that is fixed to the bottom of the users screen|**'Take Screenshot'**|
|cancelScreenshotOptionsButtonText|The screenshot options cancel button text|**'Cancel'**|
|takeScreenshotOptionsButtonText|The screenshot options capture button text|**'Take Screenshot'**|

#### Event callbacks
|Event|Description|
|:--------|:-------------|
|takeScreenshotButtonPressed|Fired when the take screenshot button is pressed from the modal|
|submitButtonPressed|Fired when the submit button is pressed from the modal|
|sendFeedbackButtonPressed|Fired when the send feedback button is pressed|
|cancelScreenshotOptionsButtonPressed|Fired when a user cancels screenshotting/highlighting|
|takeScreenshotOptionsButtonPressed|Fired when the take screenshot button is pressed|
|screenshotTaken|Fired when a user takes a screenshot|
|highlightDrawn|Fired when the user draws a highlight square|
|modalDismissed|Fired when the modal is dismissed|


# Contributing

Pull requests and issues are welcome.
