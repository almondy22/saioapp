let expDots = {};

export let fieldDetect = (state) => {
    let x2 = (stateObj, x1) => {
        let k1 = stateObj.k1;
        let k2 = stateObj.k2;
        let value = stateObj.value;
        let x2;
        if (k2 == 0) x2 = 200
        else x2 = (value - k1 * x1) / k2;
        return x2;
    }

    let objCompare = (obj1, obj2) => {
        if (obj1.x == obj2.x && obj1.y == obj2.y) return true;
        return false;
    }

    let arrEqualObj = (arr1, arr2) => {
        let arr = [];
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (objCompare(arr1[i], arr2[j])) arr.push(arr1[i]);
            }
        }
        return arr;
    }

    Object.keys(state).forEach((key) => {
        let dotsArray = [];
        if (state[`${key}`].k1 && state[`${key}`].k2 && state[`${key}`].value) {
            for (let x = 0; x < 20; x++) {
                let y = [];
                y.push(x2(state[`${key}`], x));
                let ymax = Math.max(...y);
                for (let y = 0; y < ymax; y++) {
                    if ((state[`${key}`].k1 * x + state[`${key}`].k2 * y) <= state[`${key}`].value) {
                        let dot = {
                            x: x,
                            y: y
                        }
                        dotsArray.push(dot);
                    }
                }
            }
            expDots[`${key}`] = dotsArray;
        }
    });

    let fieldDots = expDots["1"];
    let fieldLength = Object.keys(expDots).length;

    for (let i = 2; i <= fieldLength; i++) {
        console.log('kekos');
        fieldDots = arrEqualObj(fieldDots, expDots[`${i}`]);
    }
    console.log(fieldDots);

    let findCornerDots = () => {
        Object.keys(state).forEach((key) => {
            if (state[`${key}`].k1 && state[`${key}`].k2 && state[`${key}`].value) {
                for (let x1 = 0; x1 < 20; x1++) {
                    
                    // data.push(x2(state[`${key}`], x1).toFixed(2));
                }
            }
        });
    }

}