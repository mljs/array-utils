'use strict';

var integral = require('../src/getEquallySpace3').integral;
var getEquallySpacedData = require('../src/getEquallySpace3').getEquallySpacedData;

describe('get equally spaced data', function () {

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

    it('main test', function () {
        var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        var ans = getEquallySpacedData(x, y, {
            from: 1,
            to: 3,
            numberOfPoints: 3
        });

        ans[0].should.be.equal(1);
        ans[1].should.be.equal(2);
        ans[2].should.be.equal(3);

        ans = getEquallySpacedData(x, y, {
            from: 0.5,
            to: 2.5,
            numberOfPoints: 3
        });

        ans[0].should.be.equal(0.5);
        ans[1].should.be.equal(1.5);
        ans[2].should.be.equal(2.5);

        ans = getEquallySpacedData(x, y, {
            from: 9.5,
            to: 11.5,
            numberOfPoints: 3
        });

        ans[0].should.be.equal(9.5);
        ans[1].should.be.equal(5);
        ans[2].should.be.equal(0);

        y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
        ans = getEquallySpacedData(x, y, {
            from: 4,
            to: 6,
            numberOfPoints: 3
        });

        ans[0].should.be.equal(4);
        ans[1].should.be.equal(4.75); // deflation
        ans[2].should.be.equal(4);
    });

});
