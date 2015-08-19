/*!
 * mochasteps - Steps helper for Mocha
 * @version v0.1.2
 * @author Aleksander Szmigiel <kontakt@some-say.com>
 * @link https://github.com/some-say/steps
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Steps = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
global.step = require('./lib/step');
global.xstep = require('./lib/xstep');
},{"./lib/step":4,"./lib/xstep":5}],2:[function(require,module,exports){
/*
 * bail-suits
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var bailSuits = function (_suites) {
	if (_suites.suites && _suites.suites.length === 0) {
		return false;
	}

	for (var i = 0, j = _suites.suites.length; i < j; i++) {
		_suites.suites[i]._bail = true;

		if (_suites.suites[i].suites && _suites.suites[i].suites.length > 0) {
			bailSuits(_suites.suites[i]);
		}
	}
};

module.exports = bailSuits;
},{}],3:[function(require,module,exports){
/*
 * get-parent
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var getParent = function (_test) {
	if (_test.parent !== undefined) {
		return getParent(_test.parent);
	}
	return _test;
};

module.exports = getParent;
},{}],4:[function(require,module,exports){
/*
 * step
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var getParent = require('./get-parent');
var bailSuits = require('./bail-suits');

var step = function (_message, _fn) {
	var syncStep = function () {
		var context = this;

		try {
			_fn.call(context);
		} catch (_error) {
			bailSuits(getParent(context.test));
			context.test.parent._bail = true;

			throw _error;
		}
	};

	var asyncStep = function (_done) {
		var context = this;

		function onError() {
			bailSuits(getParent(context.test));
			context.test.parent._bail = true;
			process.removeListener('uncaughtException', onError);
		}

		process.addListener('uncaughtException', onError);

		try {
			_fn.call(context, function(_error) {
				if (_error) {
					onError();
					_done(_error);
				} else {
					process.removeListener('uncaughtException', onError);
					_done(null);
				}
			});
		} catch(_error) {
			onError();

			throw _error;
		}
	};

	if (_fn.length === 0) {
		it(_message, syncStep);
	} else {
		it(_message, asyncStep);
	}
};

module.exports = step;
},{"./bail-suits":2,"./get-parent":3}],5:[function(require,module,exports){
/*
 * xstep
 * Copyright(c) 2015 Aleksadner Szmigiel <kontakt@some-say.com>
 * MIT Licensed
 */

var xstep = function (_msg, _fn) {
	xit(_msg, _fn);
};

module.exports = xstep;
},{}]},{},[1])(1)
});