import { readFile , readFileSync , open , read , close , promises, createReadStream} from "fs";
import { promisify } from "util";

// Asynchronous function to read a file using async/await
export const readFileAsync = async(filePath) => {
  try {
    const data = await promises.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error.message);
    throw error; // rethrow the error for further handling if needed
  }
};

// Synchronous function to read a file via streaming
// This function reads a file in chunks and processes each chunk as it is read
export const readFileStream = (filePath) => {
  try {
    const stream = createReadStream(filePath, { encoding: "utf8" });
    stream.on("data", (chunk) => {
      stream.pause(); // Pause the stream to process the chunk
      console.table(chunk.split("\n").map((line) => line.split(",")));
      setTimeout(() => {
        stream.resume(); // Resume the stream after processing the chunk
      }, 1000); // Simulate async processing with a timeout
    });
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
};


// -----------------------------------------------------------

// Asynchronous function to read a file using callbacks
export function readFileUsingCallbacks(filePath) {
  readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error.message);
      return;
    }
    console.table(data.split("\n").map((line) => line.split(",")));
    return data;
  });
}

// Synchronous function to read a file
export function readFileSyncExample(filePath) {
  try {
    const data = readFileSync(filePath, "utf8");
    console.table(data.split("\n").map((line) => line.split(",")));
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}

// Asynchronous function to read a file using promises
export function readFileAsyncPromisified(filePath) {
  const promisifiedReadFile = promisify(readFile);
  promisifiedReadFile(filePath, "utf8")
    .then((data) => {
      console.table(data.split("\n").map((line) => line.split(",")));
    })
    .catch((error) => {
      console.error("Error reading file:", error.message);
    });
}

// Asynchronous function to read a file using fs.open and fs.read
export function readFileUsingFsOpen(filePath) {
  open(filePath, "r", (error, fd) => {
    if (error) {
      console.error("Error opening file:", error.message);
      return;
    }
    const buffer = Buffer.alloc(1024); // Allocate a buffer to read the file
    read(fd, buffer, 0, buffer.length, null, (error, bytesRead) => {
      if (error) {
        console.error("Error reading file:", error.message);
        close(fd, () => {}); // Ensure the file descriptor is closed
        return;
      }
      console.table(
        buffer
          .toString("utf8", 0, bytesRead)
          .split("\n")
          .map((line) => line.split(","))
      );

      // Close the file descriptor after reading
      close(fd, (error) => {
        if (error) {
          console.error("Error closing file:", error.message);
        }
      });
    });
  });
}