'use strict';



function getClosest(xs, ys, target) {
    if (! xs || xs.length===0) return {x: undefined, y: undefined};
    if (xs.length>1 && xs[0]>xs[1]) {
        xs=xs.slice().reverse();
        ys=ys.slice().reverse();
    }

    if (target<xs[0]) {
        return {x: xs[0], y: ys[0]};
    } else if (target>xs[xs.length-1]) {
        return {x: xs[xs.length-1], y: ys[xs.length-1]};
    }

    
    var under=0;
    var hover=xs.length-1;
    var position;
    var end=false;

    do {
        position=Math.floor((under+hover)/2);
        if (xs[position]===target) {
            break;
        } else if (xs[position]>target) {
            hover=position;
        } else {
            under=position;
        }
        switch (hover-under) {
            case 0:
                if (under<(xs.length-1)) {
                    if (target-xs[under]<target-xs[under+1]) {
                        position=under+1;
                    }
                }
                end=true;
                break;
            case 1:
                if (target-xs[under]<xs[hover]-target) {
                    position=under;
                } else {
                    position=hover;
                }
                end=true;
                break;
        }
    } while (! end)
    return {x: xs[position], y:ys[position]};
}

module.exports = getClosest;