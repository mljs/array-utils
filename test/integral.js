'use strict';

var integral = require('../src/getEquallySpace3').integral;

describe('integral', function () {

    it('should compute integral with a,b, x0 and x1', function () {
        integral(0, 1, 1, 0).should.equal(0.5);
        integral(0, 3, 1, 0).should.equal(4.5);
        integral(0, 3, 1, 1).should.equal(7.5);
        integral(0, 3, 1, 2).should.equal(10.5);
        integral(0, 3, 1, -1).should.equal(1.5);
        integral(0, 3, 1, -2).should.equal(-1.5);
        integral(0, 3, -1, 0).should.equal(-4.5);
        integral(-1, 3, -1, 0).should.equal(-4);
    });

});
