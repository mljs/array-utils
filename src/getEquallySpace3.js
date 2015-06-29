'use strict';

function getEquallySpacedData(x, y, options) {

    var xLength = x.length;
    // TODO assertSameLength(x, y)

    if (options === undefined) options = {};

    var from = (options.from === undefined) ? x[0] : options.from;
    var to = (options.to === undefined) ? x[x.length - 1] : options.to;
    // TODO assertSmallerThanOrEqual(from, to)

    var numberOfPoints = (options.numberOfPoints === undefined) ? 100 : options.numberOfPoints;
    // TODO assertAboveOne(nbPoints)

    var step = (to - from) / (numberOfPoints - 1);
    var halfStep = step / 2;

    var start = from - halfStep;
    var end = to + halfStep;
    var output = new Array(numberOfPoints);

    var originalStep = x[1] - x[0];

    // Init main variables
    var min = start;
    var max = start + step;

    var previousX = Number.MIN_VALUE;
    var previousY = 0;
    var nextX = x[0] - originalStep;
    var nextY = 0;

    var currentValue = 0;
    var slope = 0;
    var intercept = 0;
    var integralAtMin = 0;
    var integralAtMax = 0;

    var i = 0; // index of input
    var j = 0; // index of output

    function getValue() {
        return integral(previousX, nextX, slope, intercept);
    }

    function updateParameters() {
        slope = getSlope(previousX, previousY, nextX, nextY);
        intercept = -slope*previousX + previousY;
    }

    function getSlope(x0, y0, x1, y1) {
        return (y1 - y0) / (x1 - x0);
    }

    main: while(true) {
        // console.log('s:', slope);
        while ((nextX - max >= 0)) {
            // no overlap with original point, just consume current value
            integralAtMax = currentValue + integral(0, max - previousX, slope, previousY);
            output[j++] = (integralAtMax - integralAtMin) / step;

            if (j === numberOfPoints)
                break main;

            min = max;
            max += step;
            integralAtMin = integralAtMax;
        }

        if(previousX <= min && min <= nextX)
            integralAtMin = currentValue + integral(0, min - previousX, slope, previousY);

        currentValue += getValue();

        previousX = nextX;
        previousY = nextY;

        if (i < xLength) {
            nextX = x[i];
            nextY = y[i];
            i++;
        } else if (i === xLength) {
            nextX = nextX + (nextX - x[i - 2]);
            nextY = 0;
        } else {
            nextX = Number.MAX_VALUE;
            nextY = 0;
        }

        updateParameters();
    }

    return output;

}

function integral(x0, x1, slope, intercept) {
    return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
}

exports.getEquallySpacedData = getEquallySpacedData;
exports.integral = integral;