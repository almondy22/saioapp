export let fieldDetect = (state, labels) => {
    let expDots = {};
    let xMax = Math.max(...labels);
    let isFirstDone = false;

    let x2 = (stateObj, x1) => {
        let k1 = stateObj.k1;
        let k2 = stateObj.k2;
        let value = stateObj.value;
        let x2;
        if (+k2 === 0) x2 = 200
        else x2 = (value - k1 * x1) / k2;
        return x2;
    }

    let objCompare = (obj1, obj2) => {
        if (obj1.x === obj2.x && obj1.y === obj2.y) return true;    
        return false;
    }

    let arrEqualObj = (arr1, arr2, key) => {
        let arr = []; let finalArr = []; let toggle1 = false; let toggle2 = false;
        if (state['1'].sign === '>=') toggle1 = true;
        if (state[`${key}`].sign === '>=') toggle2 = true;

        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (objCompare(arr1[i], arr2[j])) arr.push(arr1[i]);
            }
        }

        if (toggle1) {
            finalArr = arr2.filter(element => {
                let temp = false;
                for (let i = 0; i < arr.length; i++) {
                    if (objCompare(element, arr[i])) temp = true;
                }
                if (temp) return false
                else return true;
            });
        } else if (toggle2) {
            finalArr = arr1.filter(element => {
                let temp = false;
                for (let i = 0; i < arr.length; i++) {
                    if (objCompare(element, arr[i])) temp = true;
                }
                if (temp) return false
                else return true;
            });
        } else finalArr = arr;
        console.log(finalArr);
        
        // if (toggle1) {
        //     for (let i = 0; i < arr2.length; i++) {
        //         for (let j = 0; j < arr.length; j++) {
        //             if (!objCompare(arr2[i], arr[j])) finalArr.push(arr2[i]);
        //         }
        //     }
        //     return finalArr;
        // } else if (toggle2) {
        //     for (let i = 0; i < arr1.length; i++) {
        //         for (let j = 0; j < arr.length; j++) {
        //             if (!objCompare(arr1[i], arr[j])) finalArr.push(arr1[i]);
        //         }
        //     }
        //     return finalArr;
        // }
        return arr;
    }

    Object.keys(state).forEach((key) => {
        let dotsArray = [];
        let keyToggle = false;
        if (key === 'isClicked' || key === 'selectValue') keyToggle = true;
        debugger;
        if ((state[`${key}`].k1 !== '0' || state[`${key}`].k2 !== '0' || state[`${key}`].value !== '0') && !keyToggle) {
            for (let x = 0; x <= xMax; x++) {
                let ymax = x2(state[`${key}`], x);
                for (let y = 0; y <= ymax; y++) {
                    if ((state[`${key}`].k1 * x + state[`${key}`].k2 * y) <= state[`${key}`].value) {
                        let dot = {
                            x: x,
                            y: y
                        }
                        dotsArray.push(dot);
                    }
                }
            }
            debugger;
            expDots[`${key}`] = dotsArray;
        }
    });
    let fieldDots = expDots["1"];
    // debugger;
    console.log(expDots);
    let fieldLength = Object.keys(expDots).length;

    for (let i = 2; i <= fieldLength; i++) {
        fieldDots = arrEqualObj(fieldDots, expDots[`${i}`], i);
    }

}

// 