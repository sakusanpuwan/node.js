## .env

`npm install dotenv --save` - Installs the dotenv package and saves it as a dependency in the package.json file.

`dotenv` - A zero-dependency module that loads environment variables from a .env file into process.env. It is used to manage configuration settings and sensitive information in Node.js applications.

```
// .env
SECRET_KEY = "qwerty"
```

```js
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.error("⚠️ Could not load .env file", result.error);
  process.exit(1);
}

console.log(`Environment variable: ${process.env.SECRET_KEY}`);
```

**NOTE** - The .env file should not be committed to version control (e.g., Git) as it may contain sensitive information. It is recommended to add the .env file to the `.gitignore` file to prevent it from being tracked by Git.

Explicit `dotenv.config()` calls ensure your .env loads at runtime, from the filesystem, not from inside the binary. This is important for security and flexibility, especially in production environments where you may not want to expose sensitive information in your codebase.

## nodemon

`npm install nodemon --save-dev` - Installs the nodemon package as a development dependency in the package.json file.

`nodemon` - A utility that monitors changes in the source code and automatically restarts the Node.js application when changes are detected. It is useful for development purposes to avoid manually restarting the server after every change.

```json
{
  "scripts": {
    "start": "node index.js", // Starts the application using Node.js
    "start:dev": "nodemon index.js" // Starts the application in development mode using nodemon
  }
}
```

## pkg

Package that allows you to package your Node.js application into a single executable file. This is useful for distributing your application without requiring users to have Node.js installed.
`npm install pkg`

```json
// package.json
  "bin": "index.js",
  "pkg": {
    "scripts": "src/**/*.js",
    "assets": [
      ".env",
      "**/*.js"
    ],
    "targets": [
      "node18-win-x64"
    ]
  },
```

pkg only supports CommonJS modules, so if ES6 modules are used, they need to be transpiled to CommonJS before packaging.

esbuild can be used to transpile ES6 modules to CommonJS.
`npm install esbuild`

```json
"esbuild": "npx esbuild src/index.js --bundle --platform=node --target=node18 --format=cjs --outfile=main.js",
```

`npx esbuild` - Runs the esbuild command to transpile the ES6 module to CommonJS, without globally installing binaries from node modules.
`src/index.js` - The entry point of the application, which is transpiled to CommonJS format.
`--bundle` - Bundles all dependencies into a single file.
`--platform=node` - Specifies the target platform as Node.js.
`--target=node18` - Specifies the target version of Node.js.
`--format=cjs` - Specifies the output format as CommonJS.
`--outfile=main.js` - Specifies the output file name as main.js.
`main.js` - The output file generated by esbuild, which contains the transpiled code.

```json
"package": "npx pkg main.js --targets node18-win-x64 --output app.exe"
```

`npx pkg` - Runs the pkg command to package the application into a single executable file, without globally installing binaries from node modules.
`main.js` - The input file that contains the transpiled code.
`--targets node18-win-x64` - Specifies the target platform and architecture for the executable file.
`--output app.exe` - Specifies the output file name as app.exe.

`app.exe` - The output executable file generated by pkg, which can be run on Windows without requiring Node.js to be installed.

`launch.cmd` - A batch file that can be used to run the application on Windows. It can be created with the following content:

```cmd
@echo off
app.exe
pause
```
