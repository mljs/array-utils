'use strict';



function getClosest(xs, ys, target) {
    if (xs.length>1 && xs[0]>xs[1]) {
        xs=xs.slice().reverse();
        ys=ys.slice().reverse();
    }


    var under=0;
    var hover=xs.length-1;
    var position;
    var end=false;
    if (target<xs)
    do {
        position=Math.floor((under+hover)/2);
        console.log(position, under, hover);
        
        if (xs[position]===target) {
            break;
        } else if (xs[position]>target) {
            hover=position;
        } else {
            under=position;
        }
        console.log('new',under, hover)
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
                console.log(target-xs[under], xs[hover]-target)
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