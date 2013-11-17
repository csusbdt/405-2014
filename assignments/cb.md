---
layout: assignment
title: Callbacks Assignment
---

## Overview

At any given moment, a server program may be required to handle requests
from several connecting clients simultaneously.
Handling these requests typically requires access to
resources through relatively slow file and socket input/output (I/O) streams.
We say that server processes are _I/O bound_ 
because most of the time is spent waiting on I/O operations to complete.

Typically the runtime environment provides I/O operations that block,
which means that execution waits until the operation completes before processing continues.
Blocking I/O is simpler to understand because the operation completes before control returns from the function.
The following is pseudo code that shows how to get a byte from a file input stream.

<pre>
byte b = fileInputStream.readNextByte()
// do something with b
</pre>

Non-blocking I/O involves passing in a callback function to the operation.
The following shows in psuedo code how to get a byte of data from a file input stream.

<pre>
define function f(byte b) {
  // do something with b
}
    
fileInputStream.readNextByte(f)
</pre>

Mainstream environments such as PHP, ASP.NET, and Java Servlets use blocking I/O.
In these environments, request handlers run in separate threads to handle requests in parallel.
If the threads need to access common data, then synchronization techniques are needed.

Node.js provides a single-threaded environment with a non-blocking API.
This means that thread synchonization is not needed but  
callback functions need to be passed into API calls that are perform I/O or other long-running activities.

The purpose of this assignment is to better understand how callbacks are used in Javascript.

## Assignment folder

Create folder _~/405/callback_ for work related to this assignment.
By the end of the assignment, this folder should contain the following files.

* README.md
* parallel.js
* sequential.js
* error.js

## Instructions

The following function <code>f</code> typifies a Javascript function
that starts a long-running activity with unknown duration and
returns immediately before the activity completes.  

<pre>
function f(cb) {
  console.log("f's activity starts.");
  setTimeout(function() {
    console.log("f's activity ends.");
    if (cb) cb();
  }, Math.floor(Math.random() * 1000));
}
</pre>

The function <code>f</code> takes as its sole argument a reference to a callback function
that is invoked when the long-running activity completes.

In this assignment, we assume that the program needs to invoke <code>f</code> 3 times and then display the word _done_. 
The following program shows the wrong way to solve this problem.

<pre>
f();
f();
f();
console.log('Done.');
</pre>

The result of the above program is the following.

<pre>
f's activity starts.
f's activity starts.
f's activity starts.
Done.
f's activity ends.
f's activity ends.
f's activity ends.
</pre>

For this assignment, you should invoke <code>f</code> 3 times in two different ways.
In the first way, the 3 invocations run sequentially.  In the second way, they run in parallel.

Create a file named _sequential.js_ that contains the definition of <code>f</code> and code that invokes <code>f</code> 3 times
so that they run in sequence and then print the word _done_ at the end.
The result of the program is the following.
Do not modify the function <code>f</code> to solve this problem.

<pre>
f's activity starts.
f's activity ends.
f's activity starts.
f's activity ends.
f's activity starts.
f's activity ends.
Done.
</pre>

Create another file named _parallel.js_ that contains the definition of <code>f</code> and code that invokes f 3 times so that they run in parallel and then print the word _done_ after all invocations complete.  The result of the program is the following.  Do not modify the function <code>f</code> to solve this problem.

<pre>
f's activity starts.
f's activity starts.
f's activity starts.
f's activity ends.
f's activity ends.
f's activity ends.
Done.
</pre>

Note that running the 3 invocations in parallel is faster than in sequence.

To solve these two problems you need to define one or more functions that you pass into <code>f</code>.
Such a function will be called after f's activity completes. 

The following is an example of an experiment that you could try as a next step to solving this problem.

<pre>
function callback1() {
  console.log('callback 1 called');
}

function callback2() {
  console.log('callback 2 called');
}

function callback3() {
  console.log('callback 3 called');
}

f(callback1);
f(callback2);
f(callback3);
</pre>

### Callbacks that take errors 

The convention in nodejs is that if a function that takes a callback can generate and error,
then the first argument of the callback holds the error.
This first argument, typically named <code>err</code>,
is either set to <code>null</code> (in the case of no error) or set to an instance of <code>Error</code> (in the case of an error).
If the function needs to return data to calling code, then it passes this as the second argument in the callback function.
If there is no error, then the function calls the callback as follows.

    cb(null, data);

If there is no data to return, then the function calls the callback as follows.

    cb(null);

If there is an error, then the function calls the callback as follows.

    cb(err);

The first thing the calling code should do is check whether <code>err</code> is <code>null</code>.

    if (err) {
        // Handle error.
        return;
    }
    // Handle normal case.

Add example code to _error.js_ that defines a function named <code>divideby</code>
that illustrates the conventions just described.
The following is a description of the <code>divideby</code> function you should implement.

    function divideby(x, y, cb) {
        // If y is zero, return an instance or Error in the first argument of cb.
        // Otherwise, divide x by y and return the result in the second argument of cb,
        // setting the first argument to null to indicate no error.

You also need test code that calls <code>divideby</code>.

    divideby(6, 3, function(err, result) {
        // Assert that err is null.
        // Assert that result is 2.
    });

    divideby(6, 0, function(err, result) {
        // Assert that err is not null.
        // Assert that result is undefined.
        // Assert that type of err.message is a string.
    });

<code>Error</code> is a constructor built into Javascript.
To create an instance of Error, pass a string to it.

    new Error('Division by zero is undefined.');

