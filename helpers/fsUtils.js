const fs = require('fs');
const util = require('util');

//promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//this function will read data from given file, then append content to file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  
  module.exports = { readFromFile, readAndAppend };

