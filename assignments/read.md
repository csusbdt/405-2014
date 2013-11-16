---
layout: assignment
title: Read Assignment
---

## Overview

The purpose of this assignment is to learn how to read documents from a CouchDB database from inside a Nodejs program.  This assignment will give you experience accessing a REST-based API.

This assignment builds on the ajax and couch assignments.  In the ajax assignment, we created a Web page that uses ajax to request a message string from the server, which it displays to the user. In the ajax assignment, the message string was hard-coded into the program. In this assignment, we will get the retrieve the message string from the database.  

## Assignment folder

Create a directory named _couch_ for the work you do for this assignment. At the end of the assignment, this folder will contain the following files.

* README.md
* createdb.bat (if on Windows) or createdb.sh (if on OS X or Linux)
* security.json
* design.json
* message.js
* root.js
* db.js
* main.js

## Reading

* Read relevant parts of the CouchDB documentation.
* Read the Nodejs documentation on HTTP client.

## Instructions

Copy your app server code from the ajax assignment to the read folder as a starting point.
Test that the application is working correctly by visiting http://localhost:5000/ in a browser.

Start your CouchDB server.

Create file _createdb.sh_ that contains commands to create a database called _read_.
The create script should insert a document with a property named _msg_.
This property should be set to the string "the read assignment".
Also, specify the value _message_ for the _\_id_ field so that we can identify
this document in a straightforward way.

Modify the ajax message request handler to retrieve the message string from the database
and return this to the client.
The following code shows how this can be done.

_message.js_

~~~~
var http = require('http');
var db = require('./db');

exports.handle = function(req, res) {
  console.log('getMsg called.');
  db.getMsg(function(err, msg) {
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    } 
    var responseObject = { msg: msg };
    var responseString = JSON.stringify(responseObject);
    var body = new Buffer(responseString, 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache, no-store'
    });
    res.end(body);
  });
};
~~~~

_db.js_

~~~~
var assert      = require('assert');
var querystring = require('querystring');
var http        = require('http');

exports.getMsg = function(cb) {
  var options = {
      hostname: 'localhost',
      auth: 'admin:1234',
      port: 5984,
      path: '/read/msg', 
      method: 'GET'
  };
  send(options, function(err, data) {   
    if (err) {                 
      console.log(err.message);         
      cb(err);                         
    }
    if (data.msg === undefined) {
      throw new Error(
        'msg property missing from msg document.\n' + JSON.stringify(data)
      );
    }
    cb(null, data.msg);
  });
};

// Send request and receive data (a Javascript object).
// options are the same as for http.request
// cb = function(data) where data is Error or Object
function send(options, cb) {
  var req;
  
  // create request
  req = http.request(options, function(res) {
    var dataString;  // to be converted to Javascript object
    
    // tell node how to convert received bytes to a Javascript string
    res.setEncoding('utf8');
    
    // accumulate data
    res.on('data', function (chunk) {
      if (dataString === undefined) dataString = chunk; else dataString += chunk;
    });
    
    // parse received data
    res.on('end', function() {
      var data;
      try {
        data = JSON.parse(dataString);
      } catch (err) {
        return cb(err);
      }
      cb(null, data);            
    });
  });
  
  // register error listener
  req.on('error', function(err) { 
    err.message += '\ndb.send: request error';
    cb(err); 
  });
  
  // send request
  req.end();
};
~~~~


