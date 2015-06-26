
var gesd = require('./src/getEquallySpace3').getEquallySpacedData;

var x = [0, 4, 8, 12, 16];
var y = [2, 5, 3, -1, 7];

var originalOptions = {
    from: -14,
    to: 28,
    nbPoints: 8
};

var options = {
    from: 0,
    to: 16,
    nbPoints: 5
};

var result = gesd(x, y, options);

console.log(result.length);
console.log(result);
