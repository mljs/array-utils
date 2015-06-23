'use strict';

var ArrayUtils = require('..');

describe('Array Utilities', function () {
    it('1D array to points', function () {
        var array = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];

        var result = ArrayUtils.CoordArrayToPoints(array, 3);

        (result[1][0]).should.be.equal(2);
        (result[1][1]).should.be.equal(2);
        (result[1][2]).should.be.equal(2);
    });

    it('1D array to Coordinate Matrix', function () {
        var array = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];

        var result = ArrayUtils.CoordArrayToCoordMatrix(array, 3);

        (result[0][0]).should.be.equal(1);
        (result[1][1]).should.be.equal(2);
        (result[2][2]).should.be.equal(3);
    });

    it('Coordinate Matrix to 1D array', function () {
        var mat = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]];

        var result = ArrayUtils.CoordMatrixToCoordArray(mat);

        result[0].should.be.equal(1);
        result[5].should.be.equal(2);
        result[12].should.be.equal(4);
    });


});
