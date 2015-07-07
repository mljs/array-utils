'use strict';

exports.SNV = SNV;
var Stat = require('ml-stat');
var Matrix = require('ml-matrix');

function SNV(data) {
    var Y = data;
    if(!Matrix.isMatrix(data)) {
        Y = new Matrix(data).clone();
    }

    var means = Matrix.columnVector(Stat.matrix.mean(data, 1));
    var std = Matrix.columnVector(Stat.matrix.standardDeviation(data.transpose(), means));

    return Y.sub(means.mmul(Matrix.ones(1, Y.columns))).divM(std.mmul(Matrix.ones(1, Y.columns)));
}