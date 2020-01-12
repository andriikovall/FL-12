/* eslint-disable no-magic-numbers */
function convert(...args) {
    let resultNums = [];
    for (const num of args) {
        if (typeof num === 'number') {
            resultNums.push(num.toString());
        } else {
            resultNums.push(parseInt(num));
        }
    }
    return resultNums;
}


function executeforEach(arr, callback) {
    if (!callback) {
        return;
    }

    for (const item of arr) {
        callback(item);
    }
}

console.log(executeforEach([0, 1, '3'], console.log));


function mapArray(arr, callback) {
    if (!callback) {
        return;
    }
    let newArr = [];

    for (const item of arr) {
        const mappedItem = callback(parseInt(item));
        newArr.push(mappedItem);
    }
    return newArr;
}

console.log(mapArray([1, '5', '8'], (n) => n * n));

function filterArray(arr, callback) {
    if (!callback) {
        return;
    }
    let newItems = [];

    for (const item of arr) {
        if (callback(item)) {
            newItems.push(item);
        }
    }

    return newItems;
}

console.log(filterArray(['1', '3', '5', 'wkfmw', 'we', '312'], parseInt));

function flipOver(string) {
    if (typeof string !== 'string') {
        return;
    }

    let newString = '';

    for (let i = string.length - 1; i >= 0; i--) {
        const char = string[i];
        newString += char;
    }

    return newString;
}

console.log(flipOver('abc'));
console.log(flipOver('qwerty'));

function makeListFromRange(range) {
    if (!Array.isArray(range)) {
        return null;
    }

    let list = [];
    // @todo: do checks for number type in ragne

    const [a, b] = range;
    for (let i = a; i <= b; i++) {
        list += i;
    }

    return list;
}

function getArrayOfKeys(items, key) {
    let arrayOfKeys = [];

    for (let obj of items) {
        arrayOfKeys.push(obj[key]);
    }

    return arrayOfKeys;
} 

const actors = [
    { name: 'tommy', age: 36 },
    { name: 'lee', age: 28 }
];

console.log(getArrayOfKeys(actors, 'name')) // ['tommy', 'lee']


function substitute(arr) {
    return mapArray(arr, (n) => n < 30 ? '*' : n);
}

console.log(substitute([58, 14, 48, 2, 31, 29]));


function getPastDay(date, daysAgo) {
    if (!isValidDate(date)) {
        return -1;
    }

    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() - daysAgo);    
    return dateCopy.getDate();
}

const date = new Date(2019, 0, 2);
console.log(getPastDay(date, 1)); // 1, (1 Jan 2019)
console.log(getPastDay(date, 2)); // 31, (31 Dec 2018)
console.log(getPastDay(date, 365)); // 2, (2 Jan 2018)


// YYYY/M/d HH:mm
function formatDate(date) {
    if (!isValidDate(date)) {
        return null;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = convertNumToStringOfSize(date.getHours(), 2);
    const minutes = convertNumToStringOfSize(date.getMinutes(), 2);
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

console.log(formatDate(new Date('6/15/2018 09:15:00'))); // "2018/6/15 09:15"
console.log(formatDate(new Date())); // "2020/1/7 12:56" // gets current local time



// helper functions

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

function convertNumToStringOfSize(num, size) {
    let string = num.toString();
    while (string.length < size) {
        string = '0' + string;
    }
    return string;
}
