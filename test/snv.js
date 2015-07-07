'use strict';

var SNV = require('..').SNV;

describe('snv normalization', function () {
    it('Main test', function () {
        var data = [[0.323, 2.56, 4.67, 13.23],
                    [1.76, 1.81, 2.20, 2.45]];
        var dataNorm = SNV(data);

        dataNorm[0][0].should.be.approximately(-0.8636, 1e-3);
        dataNorm[0][3].should.be.approximately(1.4239, 1e-3);
        dataNorm[1][0].should.be.approximately(-0.8975, 1e-3);
        dataNorm[1][3].should.be.approximately(1.2018, 1e-3);
    });
});
