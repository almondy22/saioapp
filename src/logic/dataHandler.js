let labels = [];
let data = [];
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', '#8dd3c7', '#ffffb3', '#bebada', '#fb8072'];
//k1*x+k2*y=val
let x2 = (stateObj, x1) => {
    let k1 = stateObj.k1;
    let k2 = stateObj.k2;
    let value = stateObj.value;
    return((value - k1 * x1) / k2);
}
let x1max = (stateObj) => {
    let k1 = stateObj.k1;
    let value = stateObj.value;
    if (+k1 === 0 || +value <= 0) return(500)
    // else if ()
    else return(Math.abs(value/k1));
}

export let dataHandler = (state) => {
    labels = []; data = [];
    let fullData = {};
    Object.keys(state).forEach((key) => {
        // debugger;
        if ((state[`${key}`].k1 && state[`${key}`].k2) && (+state[`${key}`].k1 !== 0 || +state[`${key}`].k2 !== 0) && (state[`${key}`].value)) {
            let x1m = x1max(state[`${key}`]);

            if (+(state[`${key}`].k2) === 0) {
                for (let i = 0; i <= x1m; i++) {
                    labels.push(i);
                    if (i === x1m) data.push(100)
                    else data.push(0);
                }
                fullData[`${key}`] = {
                    data: {
                        label: `X2(X1)(${key})`,
                        data: data,
                        borderColor: "grey",
                        borderWidth: 2,
                        fill: true,
                        radius: 1,
                        offset: 5,
                        steppedLine: true
                    },
                    labels: labels
                }
            } else {
                for (let x1 = 0; x1 <= x1m; x1++) {
                    labels.push(x1);
                    data.push(x2(state[`${key}`], x1).toFixed(2));
                }
                fullData[`${key}`] = {
                    data: {
                        label: `X2(X1)(${key})`,
                        data: data,
                        borderColor: `${colors[key-1]}`,
                        borderWidth: 2,
                        fill: true,
                        radius: 1
                    },
                    labels: labels
                }
            }                
        }
        labels = []; data = [];
    })
    
    return(fullData);
}

