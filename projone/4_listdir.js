/* 
the plugin will ultimately want to look at a collection of files all in the same directory. 
The goal of this module is to print out all of the filenames and all of the files in the current directory.
Alec thought it would require loops, but it doesn't seem to in javascript? Wait no: forEach is a loop. 
*/

// step one: https://nodejs.dev/learn/working-with-folders-in-nodejs

const fs = require('fs')
const path = require('path')
const folderPath = __dirname

fs.readdirSync(folderPath)

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }
  
 /*
 I tried this first, but it didn't work:

 fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  .filter(isFile)

console.log('Output: ' + fileName); 
*/

// Then I found this: https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j

  fs.readdirSync(folderPath).forEach(file => {
    console.log(file);
  });

// Which has a great discussion of what I might need to do later in order to read files in subdirectories, which will matter later but doesn't matter right now. 