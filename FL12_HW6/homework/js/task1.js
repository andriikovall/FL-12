/* eslint-disable no-magic-numbers */
const a = parseInt(prompt('Enter a'));
const b = parseInt(prompt('Enter b'));
const c = parseInt(prompt('Enter c'));

if ([a, b, c].some(isNaN)) {
    console.log('Invalid input data');
} else {
    const d = b*b - 4*a*c;
    if (d < 0) {
        console.log(`No solution: Discriminant (${d}) is less then 0`);
    } else {
        if (d === 0) {
            const x = -b / 2*a; 
            console.log('x = ' + x);
        } else {
            const x1 = (-b + Math.sqrt(d)) / 2 * a;
            const x2 = (-b - Math.sqrt(d)) / 2 * a;
            console.log(`x1 = ${x1}, x2 = ${x2}`);
        }
    }
}