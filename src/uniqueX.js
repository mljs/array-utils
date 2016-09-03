'use strict';

/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param xs
 * @param ys
 */

function uniqueX(xs, ys) {
    if (xs.length<2) return;

    var current=xs[0];
    var counter=0;

    for (var i=1; i<xs.length; i++) {
        if (current !== xs[i]) {
            counter++;
            current=xs[i];
            xs[counter]=xs[i];
            if (i !== counter) {
                ys[counter]=0;
            }
        };
        if (i !== counter) {
            ys[counter]+=ys[i];
        }
        
    }

    xs.length=counter+1;
    ys.length=counter+1;
}

module.exports = uniqueX;