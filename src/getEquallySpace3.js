'use strict';

exports.getEquallySpacedData = getEquallySpacedData;

function getEquallySpacedData(x, y, options) {

    var xLength = x.length;
    // TODO assertSameLength(x, y)

    if (options === undefined) options = {};

    var from = (options.from === undefined) ? x[0] : options.from;
    var to = (options.to === undefined) ? x[x.length - 1] : options.to;
    // TODO assertSmallerThanOrEqual(from, to)

    var nbPoints = (options.nbPoints === undefined) ? 100 : options.nbPoints;
    // TODO assertAboweOne(nbPoints)

    var step = (to - from) / (nbPoints - 1);
    var halfstep = step / 2;

console.log(`
    x length:   ${x.length}
    x from:     ${x[0]}
    x to:       ${x[xLength - 1]}

    new length: ${nbPoints}
    from:       ${from}
    to:         ${to}
    step        ${step}
`);

    var start = from - halfstep;
    var end = to + halfstep;
    var output = new Array(nbPoints);

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

    var i = 0; // index of input
    var j = 0; // index of output

    function getValue() {
        //TODO find something
        var something = step;
        return integral(previousX, previousY, max, slope*(max - previousX) + previousY) / something;
    }

    function updateParameters() {
        slope = (nextY - previousY) / (nextX - previousX);
        intercept = -slope*previousX + previousY;
    }

    main: while(true) {
        console.log('s:', slope);
        while ((nextX - max >= 0)) {
            // no overlap with original point, just consume current value
            console.log('  p', currentValue + getValue());
            output[j++] = currentValue + getValue();
            if (j === nbPoints)
                break main;

            currentValue = 0;
            min = max;
            max += step;
        }
        // now that nextX is between min and max, put max at the border
        var oldMax = max;
        max = nextX;
        currentValue += getValue();
        min = max;
        max = oldMax;

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

exports.integral = integral;