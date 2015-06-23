'use strict';

module.exports = Spectra;

function Spectra(X, Y) {
    this.data = new Array(X.length - 1);
    if(X[0] > X[1]) {
        X = X.reverse();
        Y = Y.reverse();
    }
    this.X = X;
    this.Y = Y;

    for (var i = 0; i < X.length - 1; i++) {
        this.data[i] = {
            slope: slope(X[i], Y[i], X[i + 1], Y[i + 1]),
            integral: trapezeIntegral(X[i], Y[i], X[i + 1], Y[i + 1])
        };
    }
}

function closestPoint(X, value) {
    var currentPoint = X.length / 2;
    var imin = 0, imax = X.length;
    var middlePoint;
    while(imax >= imin) {
        middlePoint = Math.floor((imax + imin) / 2);
        if(X[middlePoint] === value)
            return middlePoint;

        if(X[middlePoint] < value) {
            imin = middlePoint + 1;
        } else {
            imax = middlePoint - 1;
        }
    }

    var i = middlePoint;
    var middle = value > X[i] && value < X[i + 1];
    while(!middle) {
        if(value < X[i]) i--;
        else i++;
        middle = value > X[i] && value < X[i + 1];
    }

    return i;
}

function trapezeIntegral(x1, y1, x2, y2) {
    return ((y2 + y1) * (x2 - x1)) / 2;
}

function slope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}

Spectra.prototype.getEquallySpaced = function (from, to, numberOfPoints) {
    var stepSize = (to - from) / numberOfPoints;

    var X = new Array(numberOfPoints);
    var Y = new Array(numberOfPoints);
    var areas = new Array(numberOfPoints - 1);
    for (var i = 0; i < numberOfPoints; i++) {
        X[i] = from + (numberOfPoints * i);
        Y[i] = areas[i] = 0;
    }

    var morePoints = numberOfPoints > this.X.length;
    var currentIndex = from < X[0] ? 0 : closestPoint(X, from); // Be careful if is outside before
    for(var currentPosition = from, k = 0; currentPosition < to; currentPosition += stepSize, k++) {
        // outside after
        if(currentPosition < this.X[0]) {
            if(currentPosition + stepSize >= this.X[0]) {
                areas[k] = trapezeIntegral(0, 0, this.X[0], this.Y[0]);
            }
            continue;
        }

        // outside before
        if(currentPosition > this.X[this.X.length - 1]) {
            continue;
        }

        // inside of a valid range
        if(morePoints) {
            X[k] = currentPosition;

            var slope = this.data[currentIndex].slope;
            var constant = this.Y[currentIndex];
            Y[k] = (currentPosition - this.X[currentIndex]) * slope + constant;
        } else {

        }

    }
};

Spectra.prototype.integral