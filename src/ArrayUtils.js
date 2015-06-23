'use strict';

/**
 * Function that returns an array of points given 1D array as follows:
 *
 * [x1, y1, .. , x2, y2, ..]
 *
 * And receive the number of dimensions of each point.
 * @param array
 * @param dimensions
 * @returns {Array} - Array of points.
 */
function coordArrayToPoints(array, dimensions) {
    if(array.length % dimensions !== 0) {
        throw new RangeError('Dimensions number must be accordance with the size of the array.');
    }

    var length = array.length / dimensions;
    var pointsArr = new Array(length);

    var k = 0;
    for(var i = 0; i < array.length; i += dimensions) {
        var point = new Array(dimensions);
        for(var j = 0; j < dimensions; ++j) {
            point[j] = array[i + j];
        }

        pointsArr[k] = point;
        k++;
    }

    return pointsArr;
}


/**
 * Function that given an array as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * Returns an array as follows:
 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
 *
 * And receives the number of dimensions of each coordinate.
 * @param array
 * @param dimensions
 * @returns {Array} - Matrix of coordinates
 */
function coordArrayToCoordMatrix(array, dimensions) {
    if(array.length % dimensions !== 0) {
        throw new RangeError('Dimensions number must be accordance with the size of the array.');
    }

    var coordinatesArray = new Array(dimensions);
    var points = array.length / dimensions;
    for (var i = 0; i < coordinatesArray.length; i++) {
        coordinatesArray[i] = new Array(points);
    }

    for(i = 0; i < array.length; i += dimensions) {
        for(var j = 0; j < dimensions; ++j) {
            var currentPoint = Math.floor(i / dimensions);
            coordinatesArray[j][currentPoint] = array[i + j];
        }
    }

    return coordinatesArray;
}

/**
 * Function that receives a coordinate matrix as follows:
 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
 *
 * Returns an array of coordinates as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * @param coordMatrix
 * @returns {Array}
 */
function coordMatrixToCoordArray(coordMatrix) {
    var coodinatesArray = new Array(coordMatrix.length * coordMatrix[0].length);
    var k = 0;
    for(var i = 0; i < coordMatrix[0].length; ++i) {
        for(var j = 0; j < coordMatrix.length; ++j) {
            coodinatesArray[k] = coordMatrix[j][i];
            ++k;
        }
    }

    return coodinatesArray;
}

/**
 * Tranpose a matrix, this method is for coordMatrixToPoints and
 * pointsToCoordMatrix, that because only transposing the matrix
 * you can change your representation.
 *
 * @param matrix
 * @returns {Array}
 */
function transpose(matrix) {
    var resultMatrix = new Array(matrix[0].length);
    for(var i = 0; i < resultMatrix.length; ++i) {
        resultMatrix[i] = new Array(matrix.length);
    }

    for (i = 0; i < matrix.length; ++i) {
        for(var j = 0; j < matrix[0].length; ++j) {
            resultMatrix[j][i] = matrix[i][j];
        }
    }

    return resultMatrix;
}

/**
 * Function that transform an array of points into a coordinates array
 * as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * @param points
 * @returns {Array}
 */
function pointsToCoordArray(points) {
    var coodinatesArray = new Array(points.length * points[0].length);
    var k = 0;
    for(var i = 0; i < points.length; ++i) {
        for(var j = 0; j < points[0].length; ++j) {
            coodinatesArray[k] = points[i][j];
            ++k;
        }
    }

    return coodinatesArray;
}

module.exports = {
    coordArrayToPoints: coordArrayToPoints,
    coordArrayToCoordMatrix: coordArrayToCoordMatrix,
    coordMatrixToCoordArray: coordMatrixToCoordArray,
    coordMatrixToPoints: transpose,
    pointsToCoordArray: pointsToCoordArray,
    pointsToCoordMatrix: transpose
};

