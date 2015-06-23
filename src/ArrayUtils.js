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
    var points = coordinatesArray.length / dimentions;
    for (var i = 0; i < coordinatesArray.length; i++) {
        coordinatesArray[i] = new Array(points);

    }
}

module.exports = {
    CoordArrayToPoints: CoordArrayToPoints
};

