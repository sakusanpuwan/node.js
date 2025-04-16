## .env
`npm install dotenv --save` - Installs the dotenv package and saves it as a dependency in the package.json file.

`dotenv` - A zero-dependency module that loads environment variables from a .env file into process.env. It is used to manage configuration settings and sensitive information in Node.js applications.

```
// .env
SECRET_KEY = "qwerty"
```

```js
import 'dotenv/config';

console.log(`Environment variable: ${process.env.SECRET_KEY}`);
```

**NOTE** - The .env file should not be committed to version control (e.g., Git) as it may contain sensitive information. It is recommended to add the .env file to the `.gitignore` file to prevent it from being tracked by Git. 

