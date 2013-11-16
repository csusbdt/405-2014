---
layout: assignment
title: Buffers Assignment
---

## Overview

The purpose of this assignment is to continue developing a Web application, this time adding a content-type header to the response sent from the server to the browser.  We make use of [Buffers](http://nodejs.org/api/all.html#all_buffer) to ensure that the character data is sent in the correct encoding.

# Assignment folder

Create a directory named _buf_ in your repository to hold the work for this assignment.  When you complete this assignment, the contents of buf will be the following.

* main.js
* root.js

# Instructions

Create a file named _main.js_ with the following contents.

~~~~
var http = require('http');
var domain = require('domain');
var root = require('./root');

function replyError(res) {
  try {
    res.writeHead(500);
    res.end('Server error.');
  } catch (err) {
    console.error('Error sending response with code 500.');
  }
};

function replyNotFound(res) {
  res.writeHead(404);
  res.end('not found');
}

function handleRequest(req, res) {
  console.log('Handling request for ' + req.url);
  if (req.url === '/') {
    root.handle(req, res);
  } else {
    replyNotFound(res);
  }
}

var server = http.createServer();

server.on('request', function(req, res) {
  var d = domain.create();
  d.on('error', function(err) {
    console.error(req.url, err.message);
    replyError(res);
  });
  d.run(function() { handleRequest(req, res); });
});

server.listen(5000);
~~~~

The main module given above incorporates the domain-based error handling that we covered in a previous assignment.  It adds a _replyNotFound_ function, which sends a response to the client when the client requests a resource that the server does not recognize.  For this, we return a response code of 404.

The main module also delegates the processing of requests for / to module _root_.

Create file root.js with the following contents.

~~~~
var http = require('http');

var body = new Buffer("I'm a codfish.", 'utf-8');

exports.handle = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=UTF-8'
  });
  res.end(body);
};
~~~~

In root.js, we create a buffer object to store a string in the UTF-8 character encoding.  We add a header that indicates the content type is _text/plain_ and the character encoding is UTF-8.  We use the name _body_ to store the string because it is the contents of the HTTP message body to send to the browser.

Test the server code and debug so that it runs correctly.

Note the node uses chunked encoding by default to send HTTP message data.  To see this, use the Web developer tools available for your browser.  A good place to lear about how to use the developer tools built into Chrome is [the Dev-tools course on Code School](http://discover-devtools.codeschool.com/).

The alternative to chunked encoding is to set a Content-Length header.  Incorporate this into your server code and test.  Do some research to learn about the HTTP Content-Length header.

