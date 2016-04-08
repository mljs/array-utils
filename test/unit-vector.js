'use strict';

var getEquallySpacedData = require('..').getEquallySpacedData;

describe('get unit vector', function () {
// Unit

it("get unit vector", function () {
    var x = [0.9, 1, 2, 4.1, 4.4];
    var y = [1, 2, 3, 4, 5];
    var ans = getEquallySpacedData(x, y, {
        from: 2,
        to: 4,
        numberOfPoints: 3,
        variant: "unit"
    });
    ans[0].should.be.equal(3);
    ans[1].should.be.equal(0);
    ans[2].should.be.equal(9);


    x = [1, 3, 4, 6, 9];
    y = [4, 2, 9, 1, 5];
    ans = getEquallySpacedData(x, y, {
        from: 3,
        to: 6,
        numberOfPoints: 4,
        variant: "unit"
    });
    ans[0].should.be.equal(2);
    ans[1].should.be.equal(9);
    ans[2].should.be.equal(0);
    ans[3].should.be.equal(1);


    x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    ans = getEquallySpacedData(x, y, {
        from: 4,
        to: 6,
        numberOfPoints: 3,
        variant: "unit"
    });

    ans[0].should.be.equal(4);
    ans[1].should.be.equal(5);
    ans[2].should.be.equal(4);
    

    
     x = [0, 5, 10];
     y = [0, 5, 10];
     ans = getEquallySpacedData(x, y, {
     from: 0,
     to: 10,
     numberOfPoints: 2,
     variant: "unit"
     });
     ans[0].should.be.equal(5);
     ans[1].should.be.equal(10);


    x = [0, 5, 10];
    y = [1, 5, 10];

    ans = getEquallySpacedData(x, y, {
        from: 0,
        to: 10,
        numberOfPoints: 2,
        variant: "unit"
    });

    ans[0].should.be.equal(6);
    ans[1].should.be.equal(10);
    });
});