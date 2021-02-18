/* this is taken from print.js - once you have something working, it's good practice to avoid messing with it. Copy it over into a new file just in case. */

const fs = require('fs')

try {
  const data = fs.readFileSync('test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}

/* 
new goal: search the "data" variable for a particular string, e.g. if I have file test.txt and testalt.txt see which one of them contains the word "the" 
To do this, I would need to search the whole folder. That seems harder than doing this internally in one file. 
    For example if the file said "The quick brown fox jumps over the lazy dog," and I want to return something between "fox" and "over" 
    that seems easier than a multiple files that each have one of the words in the sentence and trying to return the filename of the one that has "jumps" in it,
    which isn't really the ultimate goal of my plugin anyway. 

    So in that case, I should be able to work from just the data and regex. This should theoretically work with the string.match function

    But before I do that I should scan a file to see if its contents match a search term, and I can do this by deleting the word in testrun 2. 
*/ 
