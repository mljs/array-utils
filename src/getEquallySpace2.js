'use strict';

exports.getEquallySpacedData = getEquallySpacedData;

function getEquallySpacedData(x, y, options) {

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

    var previousX = -Infinity;
    var previousY = 0;
    var nextX = x[0] - originalStep;
    var nextY = 0;

    var currentValue = 0;
    var slope = 0;

    var i = 0; // index of input
    var j = 0; // index of output

    function getValue() {
        // TODO return value using min, max and slope
        return 0
    }

    function updateSlope() {
        // TODO compute slope
        slope = 0;
    }

    do {
        while (nextX - max >= 0) {
            // no overlap with original point, just consume current value
            output[j++] = currentValue + getValue();
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
        nextX = x[i];
        previousY = nextY;
        nextY = y[i];
        i++;

        updateSlope();
    } while (nextX <= end);

    return output;

}
