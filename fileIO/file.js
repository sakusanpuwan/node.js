
import fs from 'fs';
import {readFileAsync, readFileStream} from './reader.js';
import dotenv from 'dotenv';
import csvParser from 'csv-parser';

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

// Read the file using the readFileStream stream chunks of data
// readFileStream("../data/Matches.csv");


// Use csv parser if you want each row to be mapped to an object
const rows = [];
let isFirstRow = true;
fs.createReadStream("../data/Phases.csv", { encoding: "utf8" })
    .pipe(csvParser({ 
        headers: ["ID","NAME"], 
        mapValues: ({ value }) => value.toUpperCase(), 
    })) // custom delimiter can be added -> .pipe(csvParser({ separator: ';' }))
    .on("data", (row) => {
        if (isFirstRow) {
            isFirstRow = false;
            return; // Skip the first row
        }
        console.log(row);
        console.log(`Phase Name: ${row.NAME}`);
        rows.push(row);
    })
    .on("end", () => {
        console.log("CSV file successfully processed.");
        console.table(rows);
    })
    .on("error", (error) => {
    console.error("Error reading CSV file:", error.message);
    }
);

