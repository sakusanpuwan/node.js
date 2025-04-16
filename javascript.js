import { PI, add, multiply } from './math.js';
import constants from './constants.js';


console.log(`The value of PI is ${PI}`); // The value of PI is 3.14159
console.log(`2 + 3 = ${add(2, 3)}`); // 2 + 3 = 5
console.log(`2 * 3 = ${multiply(2, 3)}`); // 2 * 3 = 6

console.log(`Name is ${constants.name}`); // Name is Sakusan
console.log(`Language is ${constants.language}`); // Language is JavaScript
console.log(`Version is ${constants.version}`); // Version is 1.0.0

