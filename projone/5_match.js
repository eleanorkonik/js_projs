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
// trying to change line 87 to `fromDir(__dirname,'/.md/i');` resulted in it returning nothing.

var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,callback){
// this is structured as line 121: startPath is __dirname, filter is the regex, and the callback is function(filename) -- an anonymous function. 
    console.log('Starting from dir '+startPath+'/');
// fs is the file system module. ! is negation, same as lua. therefore, if the startPath directory does not exist, then echo an error msg. 
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    // readdirSync is the built-in functionality from the module; it's being used to define "files" here. 
    // this variable stores the result of the function so that you can interact with it later via an array. here, "files" is behaving like an array. 
    var files=fs.readdirSync(startPath);
    // Eleanor: the following is a loop and an array. see 8_printloop.js for documentation and more detailed examples. 
    // the below is looping however number of times there are number of files. 
    for(var i=0;i<files.length;i++){
    // Source: files is a list (in javascript, this is interchangeable with an array). [i] is the place in the list (index) this gets used as convention because it stands for "index" 
        var filename=path.join(startPath,files[i]);
        // the above line makes filename == __dir plus file# in the loop series. 
        // basically, it's taking the directory name and adding the file that it's looking at in the list so that it gets spit back out later. 
        //var stat = fs.lstatSync(filename); <-- moved this to line 116 to chain the functions. see also: https://medium.com/@jamischarles/how-to-chain-functions-in-javascript-6644d44793fd
        // status here is basically referring to "is it a file or a folder" though it can be used for other stuff like timestamps. 
        if (fs.lstatSync(filename).isDirectory()){
            fromDir(filename,filter,callback); //recursion: when you call something inside of where you define it / its own definition. 
        }
        else
        {
            if (filter.test(filename))
            {
                callback(filename);
                // callback functions are sort of like derpy function-only variables that let you do a --> b --> c. 
                // but b says "do va." computer does a, but since b says do va, the computer does v, then a, then c (because it knows to skip b).
                // see also: https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/
            }
        }
    };
};

// below is where startPath is getting defined in line 96. 
// this is where the thing HAPPENS. above is basically where it's defined? 

fromDir(__dirname,/\.md$/i,function(filename){
    console.log('-- found: ',filename);
});

/* ShaLLaX suggests: don't be afraid of white space — fromDir(filename,filter,callback) is less readable than fromDir(filename, filter, callback)

His version, rewritten to include promises:  

var path = require('path'), fs=require('fs');

async function fromDir(startPath, filter, callback){
    const stats = await fs.promises.stat(startPath);

    if (!stats.isDirectory()){
        console.log("no dir ",startPath);
        return;
    }

    var files = await fs.promises.readdir(startPath);

    for(var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        const curStats = await fs.promises.stat(filename);

        if (curStats.isDirectory()) {
            fromDir(filename, filter, callback);
        }
        else if (filter.test(filename)) {
            callback(filename);
        }
    };
};

fromDir(__dirname, /\.md$/i, (filename) => {
    console.log(-- found: ${filename});
});

*/ 