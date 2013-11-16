---
layout: assignment
title: Assert Assignment
---

## Overview

The purpose of this assignment is to learn about Javascript in the context of Node.js development.

[A good source of information about Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is available through the Mozilla Developer Network.

Javascript typically runs inside a browser.
Inside this runtime environment, programs can access functionality
defined as part of the Javascript language and additional functionality provided by the browser.
For example, _Error_ is a constructor function that is part of the Javascript language definition,
but _XMLHttpRequest_ is a constructor function that is not part of the language definition but provided by browsers.

Node.js is an execution environment for Javascript that is provided by a program
that one runs from the command line.
This execution environment supports the Javascript language definition but
provides additional functionality that is different from that provided by browsers.

The additional functionality of Node.js supports the construction of command line
programs in general and servers in particular.
This additional functionality is accessed directly or indirectly through [the global object](http://nodejs.org/api/globals.html).
In browsers, a reference to the global object is obtained through the name _window_;
but in Node.js, it is accessed through the name _global_.

Node.js functionality is organized into [modules](http://nodejs.org/api/modules.html).
Modules are just Javascript objects,
but you might want to think of them as static classes, singleton classes,
packages, or namespaces from other languages.
Programs that you write are also organized into modules.
Execution of a program starts by providing the module name with the node command.
Suppose you have a file named _main.js_ in the current directory;
then you run this as a module with the following command.

    node main

When programs get big, you need to divide the code into separate modules.
When one module needs to access the state or functionality of another module,
you use a Node.js global function called _require_ to obtain a reference to it.
As an example, suppose your program is divided into 2 files main.js and util.js.
Inside the main module you can get a reference to util module as follows.

    var util = require('./util');

This assignment makes use of the _ok_ function in the Node.js assert module.
To use the function, you need to _require_ the assert module.
If you pass a true value to _assert.ok_ nothing happens;
if you pass a false value, execution terminates with a failed assertion message.
For example, the following program will terminate with a failed assertion message.

~~~~
var assert = require("assert").ok;
assert(2 + 2 == 5);  // generates failed assertion message
~~~~

The following program will terminate with no message.

~~~~
var assert = require("assert").ok;
assert(2 + 2 == 4);  // no message
~~~~

## Assignment folder

Create a folder named _assert_ in your repository to hold the results of your work on this assignment.  When you are finished with this assignment, this folder should contain the following files.

- equality.js
- exceptions.js
- prototypes.js

## equality.js

Javascript has 2 equality operators: '==' and '==='.
The operator '==' tries to coerce its operands to the same type and then checks equality.
The operator '===' does not try coercion.
For example, the number 0 can be coerced into boolean _false_.
As a result, the following expression evaluates to true.

    0 == false  // true

However, the following is false because '===' does no type coercion.

    0 === false  // false

The following program shows how to express this using assertion statements.

~~~~
var assert = require("assert").ok;
assert(0 == false);
assert(!(0 === false));
~~~~

We can simplify the last line of the above program with the knowledge that '!=' is the negation of '=='
and '!==' is the negation of '==='.

    assert(0 !== false);

The following table contains pairs of expressions that
you should investigate for type-coerced equality (== and !=)
and strict equality (=== and !==).  
In the table LHS is left-hand side and RHS is right-hand side of the equality operator.

| LHS | RHS |
|---|---|
| 0 | false |
| 1 | true |
| 3 | true |
| 0 | null |
| 0 | undefined |
| 0 | "" |
| 0 | '0' |
| 0 | 'false' |
| 3 | '3' |
| true | 'true' |
| false | 'false' |
| null | false |
| null | undefined |
| null | 0 |
| null | 3 |
| undefined | global.x1234 |
| { x: 0 } | { x: 0 } |
| 'a' | 'a' |
| a <br>_where var a = 0_ | b <br>_where var b = 0_ |
| c <br>_where var c = { x: 0 }_ | d <br>_where var d = { x: 0 }_ |
| c <br>_where var c = { x: 0 }_ | e <br>_where var e = c_ |

Create a program in a file named _equality.js_ that contains assertions that
demonstrate the type-coercing and non-type-coercing equality between each pair of expressions
in the table.
For example, your program would start as follows.

~~~~
var assert = require("assert").ok;
var a = 0;
var b = 0;
var c = { x: '0' };
var d = { x: '0' };
var e = c;
assert(0 == false);
assert(0 !== false);
assert(1 == true);
...
~~~~

## exceptions.js

The Node.js assert module has another useful assertion function named _throws_.
The assert.throws function complains if an assertion is not thrown.
The following program runs without any failure messages.

~~~~
var assert = require('assert');

function imbad() {
    throw new Error('I\'m bad.');
}

function imgood() {
  if (2 + 2 !== 4) {
    throw new Error('Something\'s wrong.');
  }
}

assert.throws(imbad);
imgood();
console.log('All tests passed.');
~~~~

Experiment with throwing instances of Error.
Create file _exceptions.js_ to document your work.
Structure _exceptions.js_ so that it does not display failure messages when run.

Note that _Error_ is a constructor function that is part of the Javascript language.

## prototypes.js

Read [Understanding JavaScript Prototypes](http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/) and develop assertions that validate (or invalidate) the author's statements.  Put your code into a file named _prototypes.js_. The following is how you should get started.  The commented lines are taken from the article.

~~~~
var assert = require('assert').ok;

var a = {};

// Object.getPrototypeOf(a); //[object Object]
assert(typeof Object.getPrototypeOf(a) === 'object');

// a.__proto__; //[object Object]
assert(Object.getPrototypeOf(a) === a.__proto__);

// a.constructor.prototype; //[object Object]
// ...

// ...
~~~~

Note: My memory is that the author's presentation contains one error.
He may have fixed this already; I don't know.

If you find an error in the author's statements,
indicate this in a comment in your program.

