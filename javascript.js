import { PI, add, multiply } from './math.js';
import constants from './constants.js';
import fs from 'fs';
import dotenv from 'dotenv';


const result = dotenv.config();
if (result.error) {
  console.error("⚠️ Could not load .env file", result.error);
  process.exit(1);
}

console.log(`The value of PI is ${PI}`); // The value of PI is 3.14159
console.log(`2 + 3 = ${add(2, 3)}`); // 2 + 3 = 5
console.log(`2 * 3 = ${multiply(2, 3)}`); // 2 * 3 = 6

console.log(`Name is ${constants.name}`); // Name is Sakusan
console.log(`Language is ${constants.language}`); // Language is JavaScript
console.log(`Version is ${constants.version}`); // Version is 1.0.0

const files = ['index.html', 'style.css', 'script.js', ];

files.forEach((file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        console.log(`File: ${data}`);
    } catch (error) {
        console.log(`Error reading file ${file}: ${error.message}`);
    }
});

console.log(`Environment variable: ${process.env.SECRET_KEY}`);

// TODO: Add more examples of Jest testing
// Mocking APIs or DB calls with jest.mock()

// Snapshot testing (good for JSON output)

// Testing async functions using async/await

// Test setup/teardown with beforeEach, afterAll, etc.

