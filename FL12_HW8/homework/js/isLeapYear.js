function isLeapYear(dateInput) {
    const date = new Date(dateInput);
    if (isValidDate(date)) {
        const year = date.getFullYear();
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        return `${year} is${isLeap ? '' : ' not'} a leap year`
    } else {
        return 'Invalid Date';
    }
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date); 
}

console.log(isLeapYear('2000')); // is leap
console.log(isLeapYear('2004-11-07')); // is leap
console.log(isLeapYear('2400')); // is leap
console.log(isLeapYear('2100')); // is not leap
console.log(isLeapYear('2012')); // is leap
console.log(isLeapYear('foo')); // invalid
console.log(isLeapYear(241645447790)); // is not leap
console.log(isLeapYear(241645447796576534743674360)); // invalid
