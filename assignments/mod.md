---
layout: assignment
title: Modules Assignment
---

## Overview

The purpose of this assignment is to understand global scope in Javascript and Node.js modules.

## Assignment folder

Create a directory named _mod_ in your repository to hold the work for this assignment. When you complete this assignment, the contents of mod will be the following.

* README.md
* global.html
* global.js
* x.js
* test.js

## Global objects

Global references in Javascript are attributes of an object called the _global namespace object_. In browsers, the global namespace object is _window_; in Node.js it's _global_. To see this, create a file _global.html_ with the following contents and load in a browser.

~~~~
<script>
window.x = 3;
document.write(x); // 3
</script>
~~~~

Contrast this with the following Node.js script.  Put the following in a file named _global.js_ and run it with command _node global.js_.

~~~~
global.x = 3;
console.log(x); // 3
~~~~

In browsers, top-level declarations create references with global scope.  Add the following to global.html and examine in browser (you may need to refresh/reload to the Web page).

~~~~
<script>
var x = 3;
document.writeln(window.x);  // 3
</script>
~~~~

However, in Node.js, top-level declarations do not create references in global scope.  To place a reference into global scope, you need to explicitly make the reference a property of the global object. Try the following in global.js to see this.

~~~~
var x = 3;
console.log(global.x);  // undefined
global.x = x;
console.log(x); // 3
~~~~

## The process object

In Node.js, the [_process_ object](http://nodejs.org/api/process.html#process_process) has global scope.  

    console.log(process !== undefined); // true

The process object is useful for accessing environmental variables.  To see this, create file _x.js_ with the following line.

~~~~
console.log(process.env.x);
~~~~

Run _x.js_ to see that _x_ is undefined.

    node x

Now, add _x_ to the environment.

    export x=3

Run x.js again to see that x is now defined and equal to 3.

You can remove _x_ from the environment with the following.

    unset x

This feature of Node.js is very useful when you are developing code that different developers run with different parameters (database connection strings, passwords, etc.).

## Module scope

Rather than going into global scope, top-level declarations in Node.js go into _module scope_, which is a scope added to the language by Node.js.  It works similarly to _require.js_ and other Javascsript libraries that try to provide a module scope that sits between function scope and global scope. You should read [the Modules section of the Node.js documentation](http://nodejs.org/api/modules.html) to get a better idea of how Node.js modules work.

References to module instances are obtained by a call to the globally scoped function _require_.  Objects in one module can be made accessible to other modules by adding the references to the module's _exports_ property.  To see how this works, create files _test.js_ and _main.js_ with the following contents, and then run main.js.

~~~~
// test.js
var x = 3;
var y = 3;
exports.x = x;
~~~~

~~~~
// main.js
var test = require('./test');
console.log(test.x === 3);
console.log(test.y === undefined);
~~~~

The material presented so far covers global scope in Javascript and module scope in Node.js.  You should continue to read and experiment until you have a firm grasp of this topic.

The other part of scoping that you need to be aware of is that unlike most popular languages, Javascript does not have block scope, which is scoping determined by braces.  Javascript uses something called function scope and variable hoisting.  To fully understand Javascript you need to have a clear understanding of function scope and variable hoisting. 
Read about this topic and true to understand what is going on in the following.

~~~
<script>
function test() {
  x = 3;
  y = 4;
  var x;
}
test();
console.log(typeof(x) === 'undefined');
console.log(typeof(y) !== 'undefined');
</script>
~~~

