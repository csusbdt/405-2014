---
layout: assignment
title: Callbacks Assignment
---

## Overview

At any given moment, a server program may be required to handle requests from several connecting clients simultaneously.  For runtime environments that do not provide non-blocking versions of I/O operations and other long-running activities, server-side code needs to run inside of separate threads in order to process requests efficiently.  In these environments, the application developer needs to manage threads and synchronize access to shared resources.

Node.js, and Javascript in general, provide non-blocking versions of I/O operations and other long-running activities, so that server-side code can run inside a single thread. This eliminates the need to manage threads and synchronization.  However, it requires the programmer to invoke some functions with callback functions that are called when the activity started by the function completes at some time in the future. It takes some time to master this paradigm.

The purpose of this assignment is to better understand how callbacks are used in Javascript.

## Assignment folder

Create a folder named _callback_ in your repository for work related to this assignment.  By the end of the assignment, _callback_ should contain the following files.

* README.md
* parallel.js
* sequential.js
* error.js

## Instructions

The following function _f_ typifies a Javascript function that starts a long-running activity with unknown duration and returns immediately before the activity completes.  

~~~~
function f(cb) {
  console.log("f's activity starts.");
  setTimeout(function() {
    console.log("f's activity ends.");
    if (cb) cb();
  }, Math.floor(Math.random() * 1000));
}
~~~~

The function _f_ takes as its sole argument a reference to a callback function that is invoked when the long-running activity completes.

In this assignment, we assume that the program needs to invoke _f_ 3 times and then display the word _done_. 
The following program shows the wrong way to solve this problem.

~~~~
f();
f();
f();
console.log('Done.');
~~~~

The result of the above program is the following.

~~~~
f's activity starts.
f's activity starts.
f's activity starts.
Done.
f's activity ends.
f's activity ends.
f's activity ends.
~~~~

For this assignment, you should invoke f 3 times in two different ways.  In the first way, the 3 invocations run sequentially.  In the second way, they run in parallel.

Create a file named _sequential.js_ that contains the definition of _f_ and code that invokes f 3 times so that they run in sequence and then print the word _done_ at the end.  The result of the program is the following.  Do not modify the function _f_ to solve this problem.

~~~~
f's activity starts.
f's activity ends.
f's activity starts.
f's activity ends.
f's activity starts.
f's activity ends.
Done.
~~~~

Create another file named _parallel.js_ that contains the definition of _f_ and code that invokes f 3 times so that they run in parallel and then print the word _done_ after all invocations complete.  The result of the program is the following.  Do not modify the function _f_ to solve this problem.

~~~~
f's activity starts.
f's activity starts.
f's activity starts.
f's activity ends.
f's activity ends.
f's activity ends.
Done.
~~~~

Note that running the 3 invocations in parallel is faster than in sequence.

To solve these two problems you need to define one or more functions that you pass into _f_.  Such a function will be called after f's activity completes. 

The following is an example of an experiment that you could try as a next step to solving this problem.

~~~~
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
~~~~

### Callbacks that take errors 

The convention in nodejs is that if a function that takes a callback can generate and error, then the first argument of the callback holds the error.  This first argument, typically named "err," is either set to null (in the case of no error) or set to an instance of Error (in the case of an error).  If the function needs to return data to calling code, then it passes this as the second argument in the callback function.  If there is no error, then the function calls the callback as follows.

    cb(null, data);

If there is no data to return, then the function calls the callback as follows.

    cb(null);

If there is an error, then the function calls the callback as follows.

    cb(err);

The first thing the calling code should do is check whether err is null.

    if (err) {
        // Handle error.
        return;
    }
    // Handle normal case.

Add example code to _error.js_ that defines a function named _divideby_
that illustrates the conventions just described.
The following is a description of the _divideby_ function you should implement.

    function divideby(x, y, cb) {
        // If y is zero, return an instance or Error in the first argument of cb.
        // Otherwise, divide x by y and return the result in the second argument of cb,
        // setting the first argument to null to indicate no error.

You also need test code that calls divideby.

    divideby(6, 3, function(err, result) {
        // Assert that err is null.
        // Assert that result is 2.
    });

    divideby(6, 0, function(err, result) {
        // Assert that err is not null.
        // Assert that result is undefined.
        // Assert that type of err.message is a string.
    });

_Error_ is a constructor built into Javascript.
To create an instance of Error, pass a string to it.

    new Error('Division by zero is undefined.');

