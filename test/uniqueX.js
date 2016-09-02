'use strict';

var uniqueX = require('..').uniqueX;


describe('uniqueX', function () {


    it('should yield the right array 1', function () {
        var xs=[0,0,1,2,3,3];
        var ys=[1,2,3,4,5,6];
        uniqueX(xs, ys);

        xs.length.should.equal(4);
        ys.length.should.equal(4);
        xs.should.eql([0,1,2,3]);
        ys.should.eql([3,3,4,11]);
    });

    it('should yield the right array 2', function () {
        var xs=[0,1,2,3];
        var ys=[1,2,3,4];
        uniqueX(xs, ys);

        xs.length.should.equal(4);
        ys.length.should.equal(4);
        xs.should.eql([0,1,2,3]);
        ys.should.eql([1,2,3,4]);
    });

    it('should yield the right array 3', function () {
        var xs=[0,0,0,0];
        var ys=[1,2,3,4];
        uniqueX(xs, ys);

        xs.length.should.equal(1);
        ys.length.should.equal(1);
        xs.should.eql([0]);
        ys.should.eql([10]);
    });
});
