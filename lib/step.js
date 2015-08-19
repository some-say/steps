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