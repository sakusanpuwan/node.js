import {writeFile, promises, createWriteStream, write } from 'fs';

export const writeFileAsync = async (filePath, data) => {
    try {
        await promises.writeFile(filePath, data, 'utf8');
        console.log(`File written successfully to ${filePath}`);
    } catch (error) {
        console.error("Error writing file:", error.message);
    }
}

// writeFileAsync('./data/app.log', 'Hello, World!');


export const appendFileAsync = async (filePath, data) => {
    try {
        await promises.appendFile(filePath, `\n${data}`, 'utf8');
        console.log(`File appended successfully to ${filePath}`);
    } catch (error) {
        console.error("Error writing file:", error.message);
    }
}

// appendFileAsync('./data/app.log', 'Hello again!');

export const writeFileStream = (filePath, data) => {
    const stream = createWriteStream(filePath, { flags: 'a', encoding: 'utf8' });
  // Write data to the stream
  stream.write(data, "utf8", () => {
    console.log(`Data written to ${filePath}`);
  });

  // Handle the 'finish' event
  stream.end(() => {
    console.log(`Stream finished writing to ${filePath}`);
  });

  // Handle errors
  stream.on("error", (error) => {
    console.error("Error writing to file:", error.message);
  });
};

writeFileStream('./data/app.log', 'Hello, World!');