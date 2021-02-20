/* goal: combine functions. use variables to rename a function. this is probably a feature that most people don't care about. */ 

// defines a function that can combine things.

function add(x, y) {
    return x+y;
}

// adds an alias to the name of the function.
var asdf = add;

// defines a variable to fill in values for the previous function. 
var qwer = asdf(2, 3);
// this is a number

// outputs the results of the function.
console.log("add result " + qwer);
// this is a string. 

// adding is really just fancy concatenation. the above is an example of tech coercion. qwer is defined here as a number. 
// javascript tries to convert numbers into strings and will error if it can't, but this is rare and shouldn't be an issue. 

console.log("sub result is " + (function (x, y) { return x-y; } ) (7, 5) );

// This is considered an anonymous function because the function doesn't have a name. it gets defined, and then immediately called (with the numbers)
// You do this when a function expects another function as a parameter and you don't want to define it elsewhere. 
// This is good for atomicity in short files and making them readable, but probably pretty terrible in large files where other people have to interact with a lot of moving parts. 


function arithmetic(operation, op1, op2)
{
    // "operation" is a callback
    return operation(op1, op2);
}

console.log("7 + 8 is %d", arithmetic(add, 7, 8));