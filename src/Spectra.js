'use strict';

module.exports = Spectra;

function Spectra(X, Y) {
    if(X[0] > X[1]) {
        this.X = X.reverse();
        this.Y = Y.reverse();
    } else {
        this.X = X;
        this.Y = Y;
    }

    // insert point at the beginning and the end of the spectra
    this.X.unshift(this.X[0] - 1);
    this.Y.unshift(0);
    this.X.push(this.X[this.X.length - 1] + 1);
    this.Y.push(0);

    this.data = new Array(Y.length - 1);
    this.numberOfPoints = Y.length;

    for (var i = 0; i < Y.length - 1; i++) {
        this.data[i] = {
            slope: slope(X[i], Y[i], X[i + 1], Y[i + 1]),
            integral: trapezeArea(X[i], Y[i], X[i + 1], Y[i + 1])
        };
    }
}


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
 * point before of x that exist in the current spectra.
 *
 * @param x
 * @param closestX
 * @returns {Number} value of y
 */

Spectra.prototype.getY = function (x, closestX) {
    if(x < 0 || x >= this.numberOfPoints)
        return 0;
    var currentX = x - this.X[closestX];
    var slope = this.data[closestX].slope;
    var intercept = this.Y[closestX];
    return slope*currentX + intercept;
};

/**
 * Function that retrieves the integral between two real points in the spectra.
 *
 * @param from
 * @param to
 * @returns {number} Integral
 */
Spectra.prototype.integral = function (from, to) {
    var fromIndex = closestPoint(this.X, from);
    var toIndex = closestPoint(this.X, to);
    var integral = 0;

    // integrate the first part
    if(from >= this.X[0] && from < this.X[this.numberOfPoints - 1])
        integral += this.data[fromIndex].integral -
                    trapezeArea(this.X[fromIndex], this.Y[fromIndex], from, this.getY(from, fromIndex));
    // integrate the last part
    if(to >= this.X[0] && to < this.X[this.numberOfPoints - 1])
        integral += this.data[toIndex].integral -
                    trapezeArea(to, this.getY(to, toIndex), this.X[toIndex + 1], this.Y[toIndex + 1]);

    for (var i = 0; i < (toIndex - fromIndex) - 1; i++) {
        var idx = fromIndex + 1 + i;
        if(idx < this.numberOfPoints)
            integral += this.data[idx].integral;
    }

    return integral;
};

/**
 * Function that return an array of equally spaced numberOfPoints containing
 * a representation of intensities of the current spectra between from and to.
 *
 * @param from
 * @param to
 * @param numberOfPoints
 * @returns {*}
 */
Spectra.prototype.getEquallySpaced = function (from, to, numberOfPoints) {
    var reverse = from > to;
    if(reverse) {
        var temp = to;
        to = from;
        from = temp;
    }

    var stepSize = (to - from) / (numberOfPoints - 1);
    var halfStep = stepSize / 2;
    var newSpectra = new Array(numberOfPoints);

    var currentPoint = closestPoint(this.X, from);
    if(numberOfPoints > to - from) {
        // increasing resolution
        for(var i = 0; i < numberOfPoints; ++i) {
            var isInvalidIndex = currentPoint < 0 || currentPoint >= this.numberOfPoints - 1;
            newSpectra[i] = isInvalidIndex ? 0 : this.getY(from, currentPoint) ;
            if(from + stepSize > this.X[currentPoint + 1])
                currentPoint++;
            from += stepSize;
        }
    } else {
        // decreasing resolution
        for(i = 0; i < numberOfPoints; ++i) {
            newSpectra[i] = this.integral(from - halfStep, from + halfStep);
            from += stepSize;
        }
    }

    return reverse ? newSpectra.reverse() : newSpectra;
};