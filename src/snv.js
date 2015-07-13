'use strict';

exports.SNV = SNV;
var Stat = require('ml-stat');
var Matrix = require('ml-matrix');

/**
 * Function that applies the standard normal variate (SNV) to each row vector of y's
 * values.
 *
 * @param data - Matrix of y vectors
 * @returns {Object}
 */
function SNV(data) {
    var Y = data;
    if(!Matrix.isMatrix(data)) {
        Y = new Matrix(data).clone();
    }

    var means = Matrix.columnVector(Stat.matrix.mean(data, 1));
    var std = Matrix.columnVector(Stat.matrix.standardDeviation(data.transpose(), means));

    return {
        result: Y.sub(means.mmul(Matrix.ones(1, Y.columns))).divM(std.mmul(Matrix.ones(1, Y.columns))),
        means: means,
        standardDeviations: std
    };
}