'use strict';

var ArrayUtils = require('../src/index');

describe('Array Utilities', function () {
    it('1D array to points', function () {
        var array = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];

        var result = ArrayUtils.CoordArrayToPoints(array, 3);

        (result[1][0]).should.be.equal(2);
        (result[1][1]).should.be.equal(2);
        (result[1][2]).should.be.equal(2);
    });
});
