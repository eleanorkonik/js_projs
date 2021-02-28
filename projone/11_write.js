// goal: write output into a .md file with a reasonably unique name

// source: https://www.geeksforgeeks.org/javascript-program-to-write-data-in-a-text-file/

// Requiring fs module in which 
// writeFile function is defined. 
const fs = require('fs') 
  
// Data which will write in a file. 
let data = "Learning how to write in a file."

let output_randomnumber = Math.floor(Math.random() * 100000000);

console.log ('filename: output_' +output_randomnumber)

// Write data in 'Output.md' . 
fs.writeFile('output_' +output_randomnumber+ '.md', data, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 

