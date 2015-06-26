'use strict';

var integral = require('../src/getEquallySpace3').integral;
var getEquallySpacedData = require('../src/getEquallySpace3').getEquallySpacedData;

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
        console.log(integral(0, 0, 1, 1));
    });

    it('main test', function () {
        var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        var ans = getEquallySpacedData(x, y, {
            from: 1,
            to: 3,
            numberOfPoints: 3
        });

        console.log(ans);
    });

});
