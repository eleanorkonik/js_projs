/* 
the plugin will ultimately want to look at a collection of files all in the same directory. 
The goal of this module is to print out all of the filenames and all of the files in the current directory.
This will require loops.
*/

// step one: https://nodejs.dev/learn/working-with-folders-in-nodejs

const fs = require('fs')
const path = require('path')
const folderPath = __dirname

fs.readdirSync(folderPath)

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }
  
 /* fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  .filter(isFile)

console.log('Output: ' + fileName); */

  fs.readdirSync(folderPath).forEach(file => {
    console.log(file);
  });