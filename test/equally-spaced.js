'use strict';

var esd = require('..').getEquallySpacedData;
var getY = require('..').getY;
var closestPoint = require('..').closestPoint;
var integral = require('..').integral;

describe('getEquallySpacedData', function () {

    var x = [1, 2, 3, 4, 5];
    var y = [1, 2, 3, 4, 5];

    it('getY', function () {
        getY(x, y, 1.5, 0).should.be.equal(1.5);
        getY(x, y, 4.4, 3).should.be.equal(4.4);
    });

    it('closest point', function () {
        closestPoint(x, 3.4).should.be.equal(2);
        closestPoint(x, 2.9).should.be.equal(1);
        closestPoint(x, -1).should.be.equal(0);
        closestPoint(x, 65).should.be.equal(x.length - 1);
    });

    it('integral', function () {
        integral(x, y, 1.4, 4.4).should.be.approximately(8.7, 1e-7);
        integral(x, y, 1.4, 1.6).should.be.approximately(0.3, 1e-7);
        integral(x, y, -4, -2).should.be.approximately(0, 1e-7);
        integral(x, y, 7, 14).should.be.approximately(0, 1e-7);
        integral(x, y, -4, 3).should.be.approximately(4.5, 1e-7);
    });

    it('Equally spaced data', function () {

        var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        var result = esd(x, y, {
            from: 1,
            to: 3,
            numberOfPoints: 3
        });

        console.log(result);


    });

});
