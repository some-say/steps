var chai = require('chai');
var expect = chai.expect;
var step = require('../lib/step');
var xstep = require('../lib/xstep');

describe('step()', function () {
	it('check functions step and xstep', function () {
		expect(step).to.be.a('function');
		expect(xstep).to.be.a('function');
	});

	describe('synchronous', function () {
		step('check step function', function () {
			expect(true).to.be.true;
		});
	});

	describe('async (callback)', function() {
		step('check not override function it(done)', function (_done) {
			setTimeout(_done, 100);
		});
	});
});

describe('xstep()', function () {
	describe('synchronous', function () {
		xstep('xstep vaild', function () {
			expect(true).to.be.true;
		});
	});

	describe('async (callback)', function() {
		xstep('xstep(done) vaild', function (_done) {
			setTimeout(_done, 100);
		});
	});
});

describe('step() not vaild expect and switch bail', function () {
	step('very bad expect', function () {
		expect(false).to.be.true;
	});
});

describe('step() never call', function () {
	step('step never execute', function () {
		expect(true).to.be.true;
	});

	it('it never execute', function () {
		expect(true).to.be.true;
	});

	xstep('xstep never execute', function () {
		expect(true).to.be.true;
	});

	xit('xit never execute', function () {
		expect(true).to.be.true;
	});
});