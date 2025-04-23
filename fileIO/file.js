
import fs from 'fs';
import {readFileAsync} from './reader.js';
import dotenv from 'dotenv';

dotenv.config();

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

const data = await readFileAsync("../data/Phases.csv");
console.table(data.split("\n").map((line) => line.split(",")));