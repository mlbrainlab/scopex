// set-homepage.js

const fs = require('fs');
const path = require('path');

// Get the environment variable or fallback to development
const homepageUrl = process.env.REACT_APP_API_URL;

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Update the homepage field in package.json
packageJson.homepage = homepageUrl;

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Set homepage to ${homepageUrl}`);
