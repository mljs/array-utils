'use strict';

var getClosest = require('..').getClosest;


describe('getClosest', function () {
    var xs=[-1,0,1,2,3,4,5,6];
    var ys=[10,11,12,13,14,15,16,17];

    it.only('should yield the correct result', function () {
        

        
     //   getClosest(xs, ys, -2).should.eql({x:-1, y:10});
      //  getClosest(xs, ys, 0.6).should.eql({x:1, y:12});
      //  getClosest(xs, ys, 4.3).should.eql({x:4, y:15});
       // getClosest(xs, ys, 6).should.eql({x:6, y:17});
        getClosest(xs, ys, 7).should.eql({x:7, y:17});
    });

});
