function isBigger(a, b) {
    return a > b;
}

console.log(isBigger(1, 0));    
console.log(isBigger(5, -1));
console.log(isBigger(-2, 0));

// eslint-disable-next-line no-undef
module.exports = isBigger;