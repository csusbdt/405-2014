---
layout: assignment
title: Json Assignment
---

## Overview

The purpose of this assignment is to learn how to return ajax data in the JSON format.

## Assignment folder

Create a directory named ajax for the work you do for this assignment. At the end of the assignment, this folder will contain the following files.

* README.md
* app.html
* main.js
* root.js
* image.js
* message.js

## Instructions

You should start the assignment by making a copy of all the files from the [Ajax assignment](https://github.com/csusbdt/405-2014/wiki/Ajax).  This will be the starting point for your experiments.

Read about the JSON data representation format from (http://json.org/).

Modify _message.js_ so that it returns the message data in the following JSON format.

~~~~
{ "msg": "hello json" }
~~~~

The following code shows one way to do this.

~~~~
var responseObject = { msg: 'hello json' };
var responseString = JSON.stringify(responseObject);
var body = new Buffer(responseString, 'utf-8');
~~~~

Change the content-type header in the reply message to _application/json_ (without specifying charset).
I believe you should omit the charset specification; see
[this Stackoverflow discussion](http://stackoverflow.com/questions/13096259/can-charset-parameter-be-used-with-application-json-content-type-in-http-1-1/13098683#13098683).

