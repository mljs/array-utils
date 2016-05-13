'use strict';

module.exports = function binarySearch(array, value) {
    var low = 0;
    var high = array.length - 1;

    while (low <= high) {
        var mid = (low + high) >>> 1;
        var midValue = array[mid];
        if (midValue < value) {
            low = mid + 1;
        } else if (midValue > value) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    
    return -(low + 1);
};
