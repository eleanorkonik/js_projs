/* Goal: Match a particular subheader and its contents. The format to be matched is

# Stuff

## Goals

## Reflections

* Text1
* Text2

## Accomplishments

Useful Resources:
* validator: https://regex101.com/ 

## Tutorials
* https://regexone.com/lesson/capturing_groups
* https://regexone.com/lesson/more_groups
* https://javascript.info/regexp-multiline-mode 

* https://www.codecademy.com/learn/introduction-to-regular-expressions
* https://regular-expressions.mobi/quickstart.html

*/ 

// The regex I got to work is: /## Reflections\n((?:.|\n)*)##/
// I inserted the regex into 6_combine.js

var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,callback){

    console.log('Starting from dir '+startPath+'/');

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
    var data;
    try {
      data = fs.readFileSync(filename, 'utf8')
      function matchString()  {
        //var result = data.match(/## Reflections\n(?<group_name>(?:.|\n)*)##/);
        
        var result = data.match(/## Reflections\n(?<group_name>(?:.|\n)*?)(?:##|$)/);
        // step one: name the capture group, which is surprisingly unusual in javascript compared to other languages 
        // the ? after the * makes the primary capture group non-greedy, which is necessary 
        // because we're taking into account newlines, we don't have to deal with "m" for multiline matching.
        // in regex, the pipe (|) means "or" -- we have to use this or because we want to capture everything INCLUDING newlines, which . doesn't normally 
        // see also: this amazing resource: https://stackoverflow.com/a/2824314
        // protip: $ doesn't always mean "end of regex" ! 

        if (result !== null) {
        //  console.log('-- found: ',filename);
          console.log(result.groups.group_name);}
     }
    matchString();
    } catch (err) {
      console.error(err)
    }
});

// next project: concatenate this output into a new .md file 