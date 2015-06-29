'use strict';

/**
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth"
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new
 * array.
 *
 * @param x
 * @param y
 * @param options
 * @returns {Array} new array with the equally spaced data.
 */
function getEquallySpacedData(x, y, options) {

    var xLength = x.length;
    if(x.length !== y.length)
        throw new RangeError("the x and y vector doesn't have the same size.");

    if (options === undefined) options = {};

    var from = options.from === undefined ? x[0] : options.from;
    var to = options.to === undefined ? x[x.length - 1] : options.to;
    if(from > to)
        throw new RangeError("from option must be less or equal that the to argument.");

    var numberOfPoints = options.numberOfPoints === undefined ? 100 : options.numberOfPoints;
    if(numberOfPoints < 1)
        throw new RangeError("the number of point must be higher than 1");

    var algorithm = options.variant === "slot" ? "slot" : "smooth"; // default value: smooth

    var step = (to - from) / (numberOfPoints - 1);
    var halfStep = step / 2;

    var start = from - halfStep;
    var output = new Array(numberOfPoints);

    var initialOriginalStep = x[1] - x[0];
    var lastOriginalStep = x[x.length - 1] - x[x.length - 2];

    // Init main variables
    var min = start;
    var max = start + step;

    var previousX = -Number.MAX_VALUE;
    var previousY = 0;
    var nextX = x[0] - initialOriginalStep;
    var nextY = 0;

    var currentValue = 0;
    var slope = 0;
    var intercept = 0;
    var sumAtMin = 0;
    var sumAtMax = 0;

    // for slot algorithm
    var currentPoints = 0;

    var i = 0; // index of input
    var j = 0; // index of output

    function getValue() {
        if(algorithm === "smooth")
            return integral(previousX, nextX, slope, intercept);
        else
            return previousY;
    }

    function updateParameters() {
        slope = getSlope(previousX, previousY, nextX, nextY);
        intercept = -slope*previousX + previousY;
    }

    function getSlope(x0, y0, x1, y1) {
        return (y1 - y0) / (x1 - x0);
    }

    main: while(true) {
        while (nextX - max >= 0) {
            // no overlap with original point, just consume current value
            var add = algorithm === "smooth" ? integral(0, max - previousX, slope, previousY) : previousY;
            sumAtMax = currentValue + add;

            var divisor = algorithm === "smooth" ? step : currentPoints - 1;
            output[j] = (sumAtMax - sumAtMin) / divisor;
            j++;

            if (j === numberOfPoints)
                break main;

            min = max;
            max += step;
            sumAtMin = sumAtMax;
            if(algorithm === "slot")
                currentPoints = 0;
        }

        if(previousX <= min && min <= nextX) {
            add = algorithm === "smooth" ? integral(0, min - previousX, slope, previousY) : previousY;
            sumAtMin = currentValue + add;
            if(algorithm === "slot")
                currentPoints++;
        }

        currentValue += getValue();
        if(currentPoints !== 0)
            currentPoints++;

        previousX = nextX;
        previousY = nextY;

        if (i < xLength) {
            nextX = x[i];
            nextY = y[i];
            i++;
        } else if (i === xLength) {
            nextX += lastOriginalStep;
            nextY = 0;
        }

        updateParameters();
    }

    return output;
}
/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 *
 * @param x0
 * @param x1
 * @param slope
 * @param intercept
 * @returns {number} integral value.
 */
function integral(x0, x1, slope, intercept) {
    return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
}

exports.getEquallySpacedData = getEquallySpacedData;
exports.integral = integral;