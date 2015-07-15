'use strict';

exports.SNV = SNV;
var Stat = require('ml-stat');
var Matrix = require('ml-matrix');

/**
 * Function that applies the standard normal variate (SNV) to an array of values.
 *
 * @param data - Array of values.
 * @returns {Array} - applied the SNV.
 */
function SNV(data) {
    var mean = Stat.array.mean(data);
    var std = Stat.array.standardDeviation(data);

    return new Matrix([data]).clone().sub(mean).div(std).getRow(0);
}