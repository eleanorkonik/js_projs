/* 
NOTE: this requires node.js to be installed. 

the following script, when run from a single directory, will search all .md files in that directory and create a .md file containing all contents of a level 2 heading, like so:

    # Title
    ## Reflections
    * content1
    * content2
    ## Heading 2

As currently written, it will return 

    * content1
    * content2

but it should be pretty straightfoward to change your search term. Note that it should still work even if you don't have a ## Heading 2. 
If you'd like to see the actual filenames that the content is coming from, uncomment line 53
*/ 

var path = require('path'), fs=require('fs');
let output_randomnumber = Math.floor(Math.random() * 100000000);

function fromDir(startPath,filter,callback){

    console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    fs.writeFile('output_' +output_randomnumber+ '.md', '', (err) => { 
        if (err) throw err; 
    })
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
        var result = data.match(/## Reflections\n(?<group_name>(?:.|\n)*?)(?:##|$)/);
        if (result !== null) {
        //  console.log('-- found: ',filename);
          console.log(result.groups.group_name);
            console.log ('added to filename: output_' +output_randomnumber)
            fs.appendFile('output_' +output_randomnumber+ '.md', result.groups.group_name, (err) => { 
                if (err) throw err; 
            })}           
     }
    matchString();
    } catch (err) {
      console.error(err)
    }
});

