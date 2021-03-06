/* 
goal: apply regex from 3_search to all the .md files in 5_match such that the output is only the canine.md
note from koala: look into using let and const instead of var. https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/
*/

// combines 3_search & 5_match

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
        var result = data.match(/dog/g);
        if (result !== null) {
          console.log('-- found: ',filename);
          console.log(result);}
     }
    matchString();
    } catch (err) {
      console.error(err)
    }
});


// next "big" will be: look for headings and print the stuff in between.  