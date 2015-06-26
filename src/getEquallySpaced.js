'use strict';

module.exports.getEquallySpacedData = getEquallySpacedData;
module.exports.getY = getY;
module.exports.closestPoint = closestPoint;
module.exports.integral = integral;

/**
 * Function that find the near closest point before the given value
 * and returns the index of the closest point in the array.
 *
 * @param array
 * @param value
 * @returns {Number} index in the array of the closest element.
 */
function closestPoint(array, value) {
    if(value < array[0])
        return 0;
    if(value > array[array.length - 1])
        return array.length - 1;

    var imin = 0, imax = array.length;
    var middlePoint;
    while(imax >= imin) {
        middlePoint = Math.floor((imax + imin) / 2);
        if(array[middlePoint] === value)
            return middlePoint;

        if(array[middlePoint] < value) {
            imin = middlePoint + 1;
        } else {
            imax = middlePoint - 1;
        }
    }

    var i = middlePoint;
    var middle = value > array[i] && value < array[i + 1];
    while(!middle) {
        if(value < array[i]) i--;
        else i++;
        middle = value > array[i] && value < array[i + 1];
    }

    return i;
}

/**
 * Function that returns the trapeze area between two points.
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
function trapezeArea(x1, y1, x2, y2) {
    return ((y2 + y1) * (x2 - x1)) / 2;
}

/**
 * Function that calculates the the slope of two points.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number} - slope
 */
function slope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}

/**
 * Get the current value of y to the corresponding x given the closest
 * point before of x that exist in the current array.
 *
 * @param x
 * @param y
 * @param value
 * @param closestIndexX
 * @returns {Number} value of y
 */

function getY(x, y, value, closestIndexX) {
    if(value < x[0] || value >= x[x.length - 1])
        return 0;
    var currentX = value - x[closestIndexX];
    var currentSlope = slope(x[closestIndexX], y[closestIndexX], x[closestIndexX + 1], y[closestIndexX + 1]);
    //var slope = this.data[closestIndexX].slope;
    var intercept = y[closestIndexX];
    return currentSlope*currentX + intercept;
}

/**
 * Function that retrieves the integral between two real points in the spectra.
 *
 * @param x
 * @param y
 * @param from
 * @param to
 * @returns {number} Integral
 */
/*function integral(x, y, from, to) {
    var fromIndex = closestPoint(x, from);
    var toIndex = closestPoint(x, to);

    var firstPoint = x[0] - Math.abs(x[0] - x[1]);
    var lastPoint = x[x.length - 1] + Math.abs(x[x.length - 1] - x[x.length - 2]);

    if(from < firstPoint && to < firstPoint || from > lastPoint && to > lastPoint)
        return 0;

    var integral = 0;
    var lastIndex = x.length - 1;

    // special case
    if(from > firstPoint && from < x[0]) {
        var slope = slope(firstPoint, 0, x[0], y[0]);
        integral += trapezeArea(firstPoint, 0, x[0], y[0]) - trapezeArea(firstPoint, 0, from, from*slope);
    }
    if(x[lastIndex] < to && to < lastPoint) {
        var slope = -slope(x[lastIndex], y[lastIndex], lastPoint, 0);
        integral += trapezeArea(lastPoint, 0, x[lastIndex], y[lastIndex]) - trapezeArea(lastPoint, 0, to, to*slope);
    }

    for (var i = fromIndex; i <= toIndex; i++)
        if(i >= 0 && i < x.length)
            integral += trapezeArea(x[i], y[i], x[i + 1], y[i + 1]);

    // subtract the first part
    if(from >= x[0] && from < x[x.length - 1])
        integral -= trapezeArea(x[fromIndex], y[fromIndex], from, getY(x, y, from, fromIndex));

    // subtract the last part
    if(to >= x[0] && to < x[x.length - 1])
        integral -= trapezeArea(to, getY(x, y, to, toIndex), x[toIndex + 1], x[toIndex + 1]);

    return integral;
}*/

/**
 * Function that return an array of equally spaced numberOfPoints containing
 * a representation of intensities of the current spectra between from and to.
 *
 * @param xArray
 * @param yArray
 * @param options
 * @returns {*}
 */
function getEquallySpacedData(xArray, yArray, options) {
    if(options === undefined) options = {};

    var x, y;
    if(xArray[0] > xArray[xArray.length-1]) {
        x = xArray.slice().reverse();
        y = yArray.slice().reverse();
    } else {
        x = xArray.slice();
        y = yArray.slice();
    }

    var from = (options.from === undefined) ? x[0] : options.from;
    var to = (options.to === undefined) ? x[x.length - 1] : options.to;
    var numberOfPoints = (options.numberOfPoints === undefined) ? x.length : options.numberOfPoints;

    /*var reverse = from > to;
    if(reverse) {
        var temp = to;
        to = from;
        from = temp;
    }*/
    var stepSize = (to - from) / (numberOfPoints - 1);
    var currentX = from;
    var currentY = 0;
    var previousX = -Infinity;
    var firstPointX = 2*x[0] - x[1];
    var firstPointY = 0;
    var array = new Array(numberOfPoints);
    //var currentIntegralValue = c;



    function blabla() {
        while(firstPointX - currentX >= stepSize) {
            currentY += trapezeArea(currentX, , firstPoint, )
        }
    }

    blabla(x0,0,x1, y1);
    for (var i = 0; i < x.length; i++) {
        blabla()
    }
    blabla(xEnd, yEnd, xEndplus1, 0);

    var halfStep = stepSize / 2;

    var currentPoint = 0;
    var currentIntegralValue = 0;
    var minXslot = from - halfStep;
    var maxXslot = from + halfStep;
    var firstPoint = x[0] - Math.abs(x[0] - x[1]);
    var lastPoint = x[x.length - 1] - Math.abs(x[x.length - 1] - x[x.length - 2]);



    while(maxXslot < firstPoint) {
        array[currentPoint] = 0;
        currentPoint++;
        minXslot += stepSize;
        maxXslot += stepSize;
    }

    // deal with case where minXslop smaller than first point
    var sl = slope(firstPoint, 0, x[0], y[0]);
    if(minXslot < firstPoint && maxXslot < x[0]) { // .|.|
        array[currentPoint] = trapezeArea(firstPoint, 0, maxXslot, sl*maxXslot);
        currentPoint++;
        minXslot += stepSize;
        maxXslot += stepSize;
    }
    if(firstPoint < minXslot && maxXslot < x[0]) { // |..|
        while(maxXslot < x[0]) {
            array[currentPoint] = trapezeArea(minXslot, sl*minXslot, maxXslot, sl*maxXslot);
            currentPoint++;
            minXslot += stepSize;
            maxXslot += stepSize;
        }
    }
    if(firstPoint < minXslot && x[0] < maxXslot) { // |.|.
        currentIntegralValue += trapezeArea(minXslot, sl*minXslot, x[0], y[0]);
    }
    if(minXslot < firstPoint && x[0] < maxXslot) { // .||.
        currentIntegralValue += trapezeArea(firstPoint, 0, x[0], y[0]);
    }
    // only on the first part


    for (var i = 0; i < x.length; i++) {
        minXslot = from + (stepSize * (currentPoint - 0.5));
        maxXslot = from + (stepSize * (currentPoint + 0.5));
        if (x[i] < minXslot) {
            currentIntegralValue += trapezeArea(minXslot, getY(x, y, minXslot, i), x[i + 1], y[i + 1]);
        } else if (x[i] > maxXslot) {
            currentIntegralValue -= trapezeArea(maxXslot, getY(x, y, maxXslot, i - 1), x[i], y[i]);

            array[currentPoint]=currentIntegralValue;
            currentPoint++;
        } else {
            currentIntegralValue += trapezeArea(x[i], y[i], x[i + 1], y[i + 1]);
        }

        //previousY = y[i];
    }

    // deal with case where maxX higher than last point
    return array;
}

function

/*
 */



/*var currentPoint = closestPoint(x, from);
 if(numberOfPoints > to - from) {
 // increasing resolution
 for(var i = 0; i < numberOfPoints; ++i) {
 var isInvalidIndex = currentPoint < 0 || currentPoint >= numberOfPoints - 1;
 array[i] = isInvalidIndex ? 0 : getY(x, y, from, currentPoint) ;
 if(from + stepSize > x[currentPoint + 1])
 currentPoint++;
 from += stepSize;
 }
 } else {
 // decreasing resolution
 for(i = 0; i < numberOfPoints; ++i) {
 array[i] = integral(x, y, from - halfStep, from + halfStep);
 from += stepSize;
 }
 }*/