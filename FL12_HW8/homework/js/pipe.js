function pipe(num) {
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] !== null && arguments[i] !== undefined) {
            num = arguments[i](num);
        }
    }
    return num;
}

const addNum = (num) => (to) => to + num;
const divide = (by) => (what) => what / by;

console.log(pipe(10, addNum(2), addNum(1), addNum(5), divide(6))); // => 3
console.log(pipe(100, addNum(-10), divide(3))); // => 30