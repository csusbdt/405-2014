---
layout: assignment
title: Assert Assignment
---

## Overview

The purpose of this assignment is to learn about Javascript in the context of Node.js development.

[A good source of information about Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is available through the Mozilla Developer Network.

Javascript typically runs inside a browser.
Inside this runtime environment, programs can access functionality defined as part of the Javascript language and additional functionality provided by the browser.
For example, <code>Error</code> is a constructor function that is part of the Javascript language definition,
but <code>XMLHttpRequest</code> is a constructor function that is not part of the language definition but provided by browsers.

Node.js is an execution environment for Javascript that is provided by a program that one runs from the command line.
This execution environment supports the Javascript language definition but provides additional functionality that is different from that provided by browsers.

The additional functionality of Node.js supports the construction of command line programs in general and servers in particular.
This additional functionality is accessed directly or indirectly through [the global object](http://nodejs.org/api/globals.html).
In browsers, a reference to the global object is obtained through the name <code>window</code>;
but in Node.js, it is accessed through the name <code>global</code>.

Node.js functionality is organized into [modules](http://nodejs.org/api/modules.html).
Modules are just Javascript objects,
but you might want to think of them as static classes, singleton classes, packages, or namespaces from other languages.

Programs that you write for Node.js are also organized into modules. The module with a program's entry point is provided on the command line when you run Node.js.  Suppose you have a file named _main.js_ in the current directory;
then you run this as a module with the following command.

    node main

When programs get big, you need to divide the code into separate modules.
When one module needs to access the state or functionality of another module,
you use a Node.js global function named <code>require</code> to obtain a reference to it.
As an example, suppose your program is divided into 2 files _main.js_ and _util.js_.
Inside the main module you can get a reference to util module as follows.

    var util = require('./util');

This assignment makes use of the <code>ok</code> function in the Node.js assert module.
To use the function, you need to _require_ the assert module.
If you pass a true value to <code>assert.ok</code> nothing happens;
if you pass a false value, execution terminates with a failed assertion message.
For example, the following program will terminate with a failed assertion message.

<pre>
var assert = require("assert").ok;
assert(2 + 2 == 5);  // generates failed assertion message
</pre>

The following program will terminate with no message.

<pre>
var assert = require("assert").ok;
assert(2 + 2 == 4);  // no message
</pre>

## Assignment folder

Create folder _~/405/assert_ to hold the results of your work on this assignment.  When you are finished with this assignment, this folder should contain the following files.

- equality.js
- exceptions.js
- prototypes.js

## equality.js

Javascript has 2 equality operators: <code>==</code> and <code>===</code>.
The operator <code>==</code> tries to coerce its operands to the same type and then checks equality.
The operator <code>===</code> does not try coercion.
For example, the number 0 can be coerced into boolean <code>false</code>.
As a result, the following expression evaluates to true.

    0 == false  // true

However, the following is false because <code>===</code> does no type coercion.

    0 === false  // false

The following program shows how to express this using assertion statements.

<pre>
var assert = require("assert").ok;
assert(0 == false);
assert(!(0 === false));
</pre>

We can simplify the last line of the above program with the knowledge that <code>!=</code> is the negation of <code>==</code>
and <code>!==</code> is the negation of <code>===</code>.

    assert(0 !== false);

The following table contains pairs of expressions that
you should investigate for type-coerced equality (<code>==</code> and <code>!=</code>)
and strict equality (<code>===</code> and <code>!==</code>).  
In the table LHS is left-hand side and RHS is right-hand side of the equality operator.

<div class="table-responsive csusbdt-assert-table">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>LHS</th>
        <th>RHS</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>0</code></td><td><code>false</code></td></tr>
      <tr><td><code>1</code></td><td><code>true</code></td></tr>
      <tr><td><code>3</code></td><td><code>true</code></td></tr>
      <tr><td><code>0</code></td><td><code>null</code></td></tr>
      <tr><td><code>0</code></td><td><code>undefined</code></td></tr>
      <tr><td><code>0</code></td><td><code>""</code></td></tr>
      <tr><td><code>0</code></td><td><code>'0'</code></td></tr>
      <tr><td><code>0</code></td><td><code>'false'</code></td></tr>
      <tr><td><code>3</code></td><td><code>'3'</code></td></tr>
      <tr><td><code>true</code></td><td><code>'true'</code></td></tr>
      <tr><td><code>false</code></td><td><code>'false'</code></td></tr>
      <tr><td><code>null</code></td><td><code>false</code></td></tr>
      <tr><td><code>null</code></td><td><code>undefined</code></td></tr>
      <tr><td><code>null</code></td><td><code>0</code></td></tr>
      <tr><td><code>null</code></td><td><code>0</code></td></tr>
      <tr><td><code>undefined</code></td><td><code>global.x1234</code></td></tr>
      <tr><td><code>{ x: 0 }</code></td><td><code>{ x: 0 }</code></td></tr>
      <tr><td><code>'a'</code></td><td><code>'a'</code></td></tr>
      <tr><td><code>a</code> where <code>var a = 0;</code></td><td><code>b</code> where <code>var b = 0;</code></td></tr>
      <tr><td><code>c</code> where <code>var c = { x: 0 };</code></td><td><code>d</code> where <code>var d = { x: 0 };</code></td></tr>
      <tr><td><code>c</code> where <code>var c = { x: 0 };</code></td><td><code>e</code> where <code>var e = c;</code></td></tr>
    </tbody>
  </table>
</div>

Create a program in a file named _equality.js_ that contains assertions that
demonstrate the type-coercing and non-type-coercing equality between each pair of expressions
in the table.
For example, your program would start as follows.

<pre>
var assert = require("assert").ok;

assert(0 == false);
assert(0 !== false);
assert(1 == true);

// ...
</pre>

## exceptions.js

The Node.js assert module has another useful assertion function named <code>throws</code>,
which complains if an assertion is not thrown.
The following program runs without any failure messages.

<pre>
var assert = require('assert');

function imgood() {
  if (2 + 2 !== 4) {
    throw new Error('Something\'s wrong.');
  }
}

function imbad() {
    throw new Error('I\'m bad.');
}

imgood();
assert.throws(imbad);
console.log('All tests passed.');
</pre>

Experiment with throwing instances of Error.
Create file _exceptions.js_ to document your work.
Structure _exceptions.js_ so that it does not display failure messages when run.

<p class="text-info well">
<code>Error</code> is a constructor function that is part of the Javascript language.
</p>

## prototypes.js

Read [Understanding JavaScript Prototypes](http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/) and develop assertions that validate or invalidate the author's statements.  Put your code into a file named _prototypes.js_. The following is how you should get started.  The commented lines are taken from the article.

<pre>
var assert = require('assert').ok;

var a = {};

// Object.getPrototypeOf(a); //[object Object]
assert(typeof Object.getPrototypeOf(a) === 'object');

// a.__proto__; //[object Object]
assert(Object.getPrototypeOf(a) === a.__proto__);

// a.constructor.prototype; //[object Object]
// ...

// ...
</pre>

<p class="text-info well">
My memory is that the author's presentation contains one error.
He may have fixed this already; I don't know.
If you find an error in the author's statements,
indicate this in a comment in your program.
</p>
