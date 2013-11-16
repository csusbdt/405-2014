---
layout: assignment
title: Events Assignment
---

## Overview

The purpose of this assignment is to better understand [events](http://nodejs.org/api/all.html#all_events) in Node.js.

Events in server-side Node.js are different than [events in client-side Web pages](https://developer.mozilla.org/en-US/docs/Web/API/Event), which you also need to learn about but is not covered in this assignment.


# Assignment folder

Create a directory named _event_ in your repository to hold the work for this assignment.  When you complete this assignment, the contents of event will be the following.

* README.md
* main.js

# Instructions

In Node.js, objects that emit events are [instances of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) EventEmitter. Node's HTTP server is an example of an event emitter.  You can see this from the following code.

~~~~
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var server = http.createServer();
console.log(server instanceof EventEmitter);
~~~~

The above code doesn't do anything other than verify that the created HTTP server object inherits all the functions in the EventEmitter's prototype object. The next bit of code shows how to register an event listener function with the server.

~~~~
function requestListener(req, res) {
  console.log('Handling request for ' + req.url);
  res.end('hello');
}

server.on('request', requestListener);
~~~~

The first argument in the _on_ function in the above code is the name of an event and the second argument is a reference to a function that is called when the event occurs.  In our case, the event we listen for is called _request_.  The request event occurs when a browser makes a TCP connection to the port the server is listening to and sends an HTTP request message.  The request event listener function takes 2 arguments: a request object and a response object.  The request object is used to read the HTTP message data sent by the browser, and the request object is used to construct and send an HTTP response message back to the browser.

There is one more thing we need to do to get a running server: tell the server to list to a port.  Add the following line to do this.

    server.listen(5000);

Assemble the above code snippets into a complete server.  Run the server and go to [http://localhost:5000](http://localhost:5000) with a browser to test.

Your browser may send 2 requests, one for / and the other for favicon.ico.  Later, we will return a _not found_ response to the browser for requests to the favicon file.  The favicon file is used by browsers as a graphical icon to represent the site, and it is probably important for a commercial website.

## Anonymous functions

In Javascript, functions are objects and are commonly treated like objects, especially in the form of callback functions where they are passed in as arguments.  When you read documentation and look at code samples, you will commonly see unnamed functions used directly in code where they are defined.  Because they are defined without a name, they are called _anonymous functions_.  (Anonymous functions are named by the functions that take them as arguments, but these names are local to the called function.)

In documentation and articles, you might see the server code presented above written with an anonymous function as follows.

~~~~
server.on('request', function (req, res) {
  console.log('Handling request for ' + req.url);
  res.end('hello');
});
~~~~

The definition of the function that was formerly named _requestListener_ is passed directly as an argument to the _on_ function without the need of assigning a name to it.

## Error handling

The material for this section comes from [the Domain section of the Node.js documentation](http://nodejs.org/api/all.html#all_domain). According to this documentation, when Javascript throws an error, the virtual machine may start to leak memory and result in other problems.  For this reason, we should avoid writing code that relies on exceptions being thrown as part of its normal operation.

The issue with a Node.js Web server is that an uncaught exception will shut down the process, which shuts off service to all clients as soon as a single uncaught exception occurs.  To avoid loss of service, we should catch and report the exception without shutting done the process.  The following code demonstrates a way to do this using [Domains](http://nodejs.org/api/all.html#all_domain).

~~~~
var http = require('http');
var domain = require('domain');

function replyError(res) {
  try {
    res.writeHead(500);
    res.end('Server error.');
  } catch (err) {
    console.error('Error sending response with code 500.');
  }
};

function handleRequest(req, res) {
  console.log('Handling request for ' + req.url);
  if (Math.random() > .5) throw new Error("I'm bad.");
  res.end('hello');
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

Any errors thrown while handling a given request will be caught by a domain object specific to the request in order to avoid halting the server.

In the README.md file, explain what the following line of code does in the example given above.

    if (Math.random() > .5) throw new Error("I'm bad.");

