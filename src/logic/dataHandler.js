let labels = [];
let xmax = [];
let data = [];
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', '#8dd3c7', '#ffffb3', '#bebada', '#fb8072'];

let x2 = (stateObj, x1) => {
    let k1 = stateObj.k1;
    let k2 = stateObj.k2;
    let value = stateObj.value;
    let x2;
    if (k2 == 0) x2 = 200
    else x2 = (value - k1 * x1) / k2;
    return x2;
}
let x1max = (stateObj) => {
    let k1 = stateObj.k1;
    let value = stateObj.value;
    let x1m;
    if (k1 == 0) x1m = 500
    else x1m = value/k1;
    return x1m;
}

export let dataHandler = (state) => {
    labels = []; data = []; xmax = [];
    let fullData = {};
    Object.keys(state).forEach((key) => {
        if ((state[`${key}`].k1 && state[`${key}`].k2) && (state[`${key}`].k1 != 0 || state[`${key}`].k2 != 0) && state[`${key}`].value) {
            let x1m = x1max(state[`${key}`]);
            xmax.push(x1m);
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
        labels = []; data = [];
    })
    
    return(fullData);
}

