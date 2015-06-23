'use strict';

function CoordArrayToPoints(array, dimentions) {
    if(array.length % dimentions !== 0) {
        throw new RangeError('Dimentions number must be accordance with the size of the array.');
    }

    var length = array.length / dimentions;
    var pointsArr = new Array(length);

    var k = 0;
    for(var i = 0; i < array.length; i += dimentions) {
        var point = new Array(dimentions);
        for(var j = 0; j < dimentions; ++j) {
            point[j] = array[i + j];
        }

        pointsArr[k] = point;
        k++;
    }

    return pointsArr;
}

function CoordArrayToCoordMatrix(array, dimentions) {
    if(array.length % dimentions !== 0) {
        throw new RangeError('Dimentions number must be accordance with the size of the array.');
    }

    var coordinatesArray = new Array(dimentions);
    var points = array.length / dimentions;
    for (var i = 0; i < coordinatesArray.length; i++) {
        coordinatesArray[i] = new Array(points);
    }

    for(i = 0; i < array.length; i += dimentions) {
        for(var j = 0; j < dimentions; ++j) {
            var currentPoint = Math.floor(i / dimentions);
            coordinatesArray[j][currentPoint] = array[i + j];
        }
    }

    return coordinatesArray;
}

function CoordMatrixToCoordArray(coordMatrix) {
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

module.exports = {
    CoordArrayToPoints: CoordArrayToPoints,
    CoordArrayToCoordMatrix: CoordArrayToCoordMatrix,
    CoordMatrixToCoordArray: CoordMatrixToCoordArray
};

