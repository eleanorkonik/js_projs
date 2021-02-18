// goal: return only filenames from the directory that have .md endings. 

/* Attempt #1: failed utterly

resources: 4_listdir & https://stackoverflow.com/questions/44199883/how-do-i-get-a-list-of-files-with-specific-file-extension-using-node-js

const fs = require('fs')
const path = require('path')
const folderPath = __dirname

fs.readdirSync(folderPath)

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }

  fs.readdirSync(folderPath).forEach(file => {
    console.log(file);
  });

var extension = '.md';

var targetFiles = file.filter(function(file) {
    return path.extname(file).toLowerCase() === extension;
});

*/ 

// Attempt #2 https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

/* 

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname);
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        
        fs.readdir(__dirname, function(err, files) {
            const txtFiles = files.filter(el => path.extname(el) === '.md')
        }) 

        console.log(file); 
    });
});

*/ 

// errors in unexpected ways when I change console.log from "file" (outputs all 9 files) to "files" (recursively outputs 9 lists of all 9 files)

// Attempt #3: https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs

/* 

var path = require('path'), fs=require('fs');

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
        };
    };
};

fromDir(__dirname,'.md');

*/

// this works but it only matches .md not .MD -- probably not a problem under normal circumstances, but I should be thorough, right? 
// trying to change line 85 to `fromDir(__dirname,'/.md/i');` resulted in it returning nothing.

var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,callback){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

fromDir(__dirname,/\.md$/i,function(filename){
    console.log('-- found: ',filename);
});

