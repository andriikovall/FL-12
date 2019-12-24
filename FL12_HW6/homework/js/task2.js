const a = parseInt(prompt('Enter a'));
const b = parseInt(prompt('Enter b'));
const c = parseInt(prompt('Enter c'));

const sides = [a, b, c];

if (sides.some(isNaN)) {
    alert('input values should be ONLY numbers');
} else if (sides.some((s) => s <= 0 )) {
    alert('A triangle must have 3 sides with a positive definite length ');
} else if (a + b < c || a + c < b || b + c < a) {
    alert('Triangle doesn’t exist');
} else {

    if (a === b && b === c) {
        console.log('Equilateral triangle');
    } else if (sides.some((s, index) => s === sides[(index + 1) % sides.length])) {
        console.log('Isosceles triangle');
    } else if (a !== b && b !== c && a !== c) {
        console.log('Scalene triangle');
    }
}
