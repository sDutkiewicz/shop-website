const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'build', 'static');
const destDir = path.join(__dirname, '..', 'static');

const indexSource = path.join(__dirname, 'build', 'index.html');
const indexDest = path.join(destDir, 'index.html');

// Copy static files
fs.copy(sourceDir, destDir, (err) => {
    if (err) {
        console.error('Error copying static files:', err);
    } else {
        console.log('Static files copied successfully.');
    }
});

// Copy index.html
fs.copy(indexSource, indexDest, (err) => {
    if (err) {
        console.error('Error copying index.html:', err);
    } else {
        console.log('index.html copied successfully.');
    }
});
