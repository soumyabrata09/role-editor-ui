const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

// Specify the root directory where you want to delete files
const rootDir = path.join(__dirname, 'src/app/lib/generated');

// Define the patterns you want to match
const patternsToDelete = [/module/, /base.*\.ts/, /service/, /config/];

rimraf.sync('src/app/lib/generated/fn');
rimraf.sync('src/app/lib/generated/services');

// Function to recursively delete files matching the patterns
function deleteMatchingFiles(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            deleteMatchingFiles(filePath); // Recurse into subdirectories
        } else {
            // Check if the file matches any of the patterns
            if (patternsToDelete.some((pattern) => file.match(pattern))) {
                rimraf.sync(filePath); // Delete the file
                console.log(`Deleted: ${filePath}`);
            }
        }
    });
}

// Call the function with the root directory
deleteMatchingFiles(rootDir);
