function getMin() {
    let minValue = arguments[0];
    for (let val of arguments) {
        if (val < minValue) {
            minValue = val;
        }
    }
    return minValue;
}


console.log(getMin(1, 2, 34, 5, 6, -13, 12)); // => -13
console.log(getMin(213, 21, -23, 2, 8, -3242342, 32, 5)); // => -3242342
