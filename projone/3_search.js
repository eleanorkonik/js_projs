/* this is taken from print.js - once you have something working, it's good practice to avoid messing with it. Copy it over into a new file just in case. */

const fs = require('fs')

var data;
try {
  data = fs.readFileSync('test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}

/* 
for the following code to work, the previously-working code needs to be amended, 
because javascript doesn't like it if you declare a variable (even a local one) inside of a try function, 
so it needs to be moved onto its own, preceding line. Javascript appears to use special scoping rules inside of "try" in order to minimize risk; 
it basically forces the variable to be local to the "try"
*/ 


/* 
new goal: search the "data" variable for a particular string, e.g. if I have file test.txt and testalt.txt see which one of them contains the word "the" 
To do this, I would need to search the whole folder. That seems harder than doing this internally in one file. 
    For example if the file said "The quick brown fox jumps over the lazy dog," and I want to return something between "fox" and "over" 
    that seems easier than a multiple files that each have one of the words in the sentence and trying to return the filename of the one that has "jumps" in it,
    which isn't really the ultimate goal of my plugin anyway. Before I do that I should scan a file to see if its contents match a search term, and I can do this by deleting the word in testrun 2. 

    So in that case, I should be able to work from just the data and regex. This should theoretically work with the string.match function. 
    More here: https://www.geeksforgeeks.org/javascript-match/

      trying to figure out why the syntax given seems inverted between the "syntax" and "code" sections.

    string.match(regex) relies on regex. This is a good resource for learning regex if you're not already familiar with it: https://regexone.com/lesson/letters_and_digits
*/

function matchString() {
  var string = "cat turtle cat";
  var result = string.match(/turtle/g);
  console.log(result);
}
matchString();

/* 
The above is proof of concept without using any variables.

Note: lines 36-40 define the function ; line 41 calls it.

The below is proof of concept using the variable defined in line 5. 
*/ 

function matchString() {
  var result = data.match(/dog/g);
  console.log(result);
}
matchString();

/* Note: in properly formatted code you wouldn't have so much repetition, but I'm keeping them separate for the visual cueing */ 
