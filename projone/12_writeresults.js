// combine 11_ and 11_ to output a markdown file containing the contents of a recurring subheading. 

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

