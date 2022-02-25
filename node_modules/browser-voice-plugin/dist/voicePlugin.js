(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VoicePlugin"] = factory();
	else
		root["VoicePlugin"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 53:
/***/ (function(__unused_webpack_module, exports) {


exports.__esModule = true;
exports.IeSounder = exports.CsSounder = void 0;
var CsSounder = /** @class */ (function () {
    function CsSounder(options) {
        this.sounder = null;
        this.options = options;
    }
    CsSounder.prototype.init = function () {
        var options = this.options;
        this.sounder = new SpeechSynthesisUtterance();
        this.sounder.volume = (options === null || options === void 0 ? void 0 : options.volume) || 0.5;
        this.sounder.rate = (options === null || options === void 0 ? void 0 : options.rate) || 1;
        this.sounder.lang = (options === null || options === void 0 ? void 0 : options.lang) || 'zh-CN';
        this.sounder.pitch = (options === null || options === void 0 ? void 0 : options.pitch) || 1;
    };
    CsSounder.prototype.speak = function (message) {
        this.sounder.text = message;
        window.speechSynthesis.speak(this.sounder);
    };
    CsSounder.prototype.pause = function () {
        window.speechSynthesis.pause();
    };
    CsSounder.prototype.resume = function () {
        window.speechSynthesis.resume();
    };
    CsSounder.prototype.stop = function () {
        window.speechSynthesis.cancel();
    };
    return CsSounder;
}());
exports.CsSounder = CsSounder;
var IeSounder = /** @class */ (function () {
    function IeSounder(options) {
        this.sounder = null;
        this.options = options;
    }
    IeSounder.prototype.init = function () {
        var options = this.options;
        this.sounder = new ActiveXObject('Sapi.SpVoice');
        this.sounder.volume = (options === null || options === void 0 ? void 0 : options.volume) ? options.volume * 100 : 50;
        this.sounder.rate = (options === null || options === void 0 ? void 0 : options.rate) ? options.rate * 2 - 10 : -6;
    };
    IeSounder.prototype.speak = function (message) {
        this.sounder.Speak(message, 3);
    };
    IeSounder.prototype.pause = function () {
        this.sounder.Pause();
    };
    IeSounder.prototype.resume = function () {
        this.sounder.Resume();
    };
    IeSounder.prototype.stop = function () {
        this.sounder.Speak('', 3);
    };
    return IeSounder;
}());
exports.IeSounder = IeSounder;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = true;
var sounder_1 = __webpack_require__(53);
var VoicePlugin = /** @class */ (function () {
    function VoicePlugin(options) {
        this.sounder = null;
        this.options = options;
        this.initPlugin();
    }
    VoicePlugin.prototype.verifyBrowser = function () {
        var userAgent = navigator.userAgent;
        var isIE = !!window.ActiveXObject || 'ActiveXObject' in window;
        var isSafari = userAgent.indexOf('Safari') > -1 &&
            userAgent.indexOf('Chrome') == -1;
        var isChrome = userAgent.indexOf('Chrome') > -1 &&
            userAgent.indexOf('Safari') > -1;
        if (isIE) {
            return 'IE';
        }
        else if (isSafari || isChrome) {
            return 'CS';
        }
        else {
            return false;
        }
    };
    VoicePlugin.prototype.initPlugin = function () {
        if (window.$voicePlugin) {
            throw new Error('Only one VoicePlugin can be initialized on the current page!');
        }
        if (this.options && (this.options).toString() !== '[object Object]') {
            throw new Error('Not a valid parameter (should be Object)');
        }
        var browser = this.verifyBrowser();
        if (browser === 'IE') {
            this.sounder = new sounder_1.IeSounder(this.options);
        }
        else if (browser == 'CS') {
            this.sounder = new sounder_1.CsSounder(this.options);
        }
        else {
            throw new Error('The browser does not currently support VoicePlugin!');
        }
        this.sounder.init();
        window.$voicePlugin = this.sounder;
    };
    VoicePlugin.prototype.speak = function (message) {
        if (message && typeof message !== 'string') {
            throw new Error('The speak method only supports broadcast text!');
        }
        this.sounder.speak(message);
    };
    VoicePlugin.prototype.pause = function () {
        this.sounder.pause();
    };
    VoicePlugin.prototype.resume = function () {
        this.sounder.resume();
    };
    VoicePlugin.prototype.stop = function () {
        this.sounder.stop();
    };
    return VoicePlugin;
}());
exports.default = VoicePlugin;

}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});