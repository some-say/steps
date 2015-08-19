var chai = require('chai');
var expect = chai.expect;

require('../lib/step');
require('../lib/xstep');

describe('it()', function () {
	describe('synchronous', function () {
		it('check not override function it', function () {
			expect(true).to.be.true;
		});
	});

	describe('async (callback)', function() {
		it('check not override function it(done)', function (_done) {
			setTimeout(_done, 100);
		});
	});
});

describe('xit()', function () {
	describe('synchronous', function () {
		xit('check not override function xit', function () {
			expect(true).to.be.true;
		});
	});
});
