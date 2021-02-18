/* 
    goal: open a file, print the contents of the file to the command line, and then close the file.
    
    potentially useful documentation:
        https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file 
            This code will error because fetch is not yet defined. It is intended for use if you have node-fetch installed or are working from a browser. 
            Fetch is intended for browsers, being able to do it for local filesystem doesn't mean you SHOULD.
        https://stackoverflow.com/questions/18386361/read-a-file-in-node-js/19722356#19722356
            The documentation for fs and path is here: https://nodejs.dev/learn/working-with-folders-in-nodejs
            
     Use fs.readdir() or fs.readdirSync() to read the contents of a directory.

       

     Obsidian doesn't use fs and path, it uses its own api because it's electron-based, so as the learning exercise it was important to do the above.
     But once I have a better understanding of javascript, I should begin here for the Obsidian plugin:
        sample plugin that does this: https://github.com/lynchjames/note-refactor-obsidian
        obsidian api: https://github.com/obsidianmd/obsidian-api/    

    To do things with Obsidian, I'm going to need to understand things like "promise" and "object" better than I currently do. 
        Object: a term used in "object oriented programming" ; objects refer to things with "state" (stored in "fields") and "behavior" (methods/functions).
        Functions are verbs. States are more like (because they're fundamentally descriptive in nature, e.g. a box "has length 6" rather than "is long") adjectives. 
        Class: function + variables that get grouped up to do stuff. The group of a function and variables is called a class. 
        Classes comprise objects. Objects are the thing that make up a class. An object is an instance (e.g. in Guild Wars) of a class. 

        Promise: A Promise is an object representing the eventual completion or failure of an asynchronous operation. 

  */ 

 const fs = require('fs')

 try {
   const data = fs.readFileSync('test.txt', 'utf8')
   console.log(data)
 } catch (err) {
   console.error(err)
 }

 /* 
    try ... catch is basically a complex if statement. "If X works, do X, else do Y" 
    documentation is here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
*/ 

 /* __dirname variable returns the absolute path of the directory */
 
 /* utf8 is a text encoding and needs to be specified so the computer knows to expect English and not Chinese or Russian letters. */ 
 
 /* 
     syncronus javascript is when the output happens in the order I put them in (it's more intuitive), 
     async is when it's when they're outputted in the order they executed first (e.g. whichever function is faster)
 */ 