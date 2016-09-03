'use strict';

var getClosest = require('..').getClosest;


describe('getClosest', function () {
    it('should yield the correct result with even element array', function () {
        var xs=[-1,0,1,2,3,4,5,6];
        var ys=[10,11,12,13,14,15,16,17];
        getClosest(xs, ys, -2).should.eql({x:-1, y:10});
        getClosest(xs, ys, 0.6).should.eql({x:1, y:12});
        getClosest(xs, ys, 4.3).should.eql({x:4, y:15});
        getClosest(xs, ys, 6).should.eql({x:6, y:17});
        getClosest(xs, ys, 7).should.eql({x:6, y:17});
    });

    it('should yield the correct result with odd element array', function () {
        var xs=[-1,0,1,2,3,4,5,6,7];
        var ys=[10,11,12,13,14,15,16,17,18];
        getClosest(xs, ys, -2).should.eql({x:-1, y:10});
        getClosest(xs, ys, 0.6).should.eql({x:1, y:12});
        getClosest(xs, ys, 4.3).should.eql({x:4, y:15});
        getClosest(xs, ys, 6).should.eql({x:6, y:17});
        getClosest(xs, ys, 7).should.eql({x:7, y:18});
        getClosest(xs, ys, 7).should.eql({x:7, y:18});
    });

    it('should yield the correct result with odd element array and descending order', function () {
        var xs=[7,6,5,4,3,2,1,0,-1];
        var ys=[18,17,16,15,14,13,12,11,10];
        getClosest(xs, ys, -2).should.eql({x:-1, y:10});
        getClosest(xs, ys, 0.6).should.eql({x:1, y:12});
        getClosest(xs, ys, 4.3).should.eql({x:4, y:15});
        getClosest(xs, ys, 6).should.eql({x:6, y:17});
        getClosest(xs, ys, 7).should.eql({x:7, y:18});
        getClosest(xs, ys, 7).should.eql({x:7, y:18});
    });
});
