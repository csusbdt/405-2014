---
layout: assignment
title: HTML Assignment
---

## Overview

The purpose of this assignment is to learn how to read files into buffers and deliver to requesting clients.

## Assignment folder

Create a directory named _html_ for the work you do for this assignment.  At the end of the assignment, this folder will contain the following files.

* README.md
* app.html
* main.js
* root.js
* image.js

## Instructions

Create a file named _app.html_.  Add HTML content to the file.

Our strategy will be to read app.html into a buffer when he server starts. When browsers send a request for /, we return the contents of the buffer.

Copy _main.js_ from the [Buffers](https://github.com/csusbdt/405-2014/wiki/Buffers) assignment. 

Create file _root.js_ with the following contents.

~~~~
var http = require('http');

var body;

exports.handle = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Content-Length': body.length
  });
  res.end(body);
};

exports.init = function(cb) {
  require('fs').readFile('app.html', function(err, data) {
    if (err) throw err;
    body = data;
    cb();
  });
}
~~~~

Modify main.js so that it calls the exported init function in the root module _before_ the server starts listening to port 5000.  To accomplish this, you need to run the command to listen to port 5000 inside the callback function that you pass into init.

Run and test with browser.

Add an img element to your web page that loads an image from your server.  There are many ways to return the image from the server, but for this assignment you should create a module similar to root.js that does the job.  Call the module file _image.js_.

Run and test with browser.

