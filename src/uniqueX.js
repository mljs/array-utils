'use strict';

/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param xs
 * @param ys
 */

function uniqueX(xs, ys) {
    if (xs.length<2) return;
    var oldXS=xs.slice();
    var oldYS=ys.slice();
    ys.fill(0);
    ys[0]=oldYS[0];

    var current=oldXS[0];
    var counter=0;

    for (var i=1; i<oldXS.length; i++) {
        if (current !== oldXS[i]) {
            counter++;
            current=oldXS[i];
            xs[counter]=oldXS[i];
        };
        ys[counter]+=oldYS[i];
    }

    xs.length=counter+1;
    ys.length=counter+1;
}

module.exports = uniqueX;