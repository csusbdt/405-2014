---
layout: assignment
title: Ajax Assignment
---

## Overview

The purpose of this assignment is to learn how to retrieve data from the server using ajax, which is the foundation of single-page Web Applications.

## Assignment folder

Create a directory named ajax for the work you do for this assignment. At the end of the assignment, this folder will contain the following files.

* README.md
* app.html
* main.js
* root.js
* image.js
* message.js

## Instructions

You should start the assignment by making a copy of all the files from the [HTML assignment](https://github.com/csusbdt/405-2014/wiki/HTML).  This will be the starting point for your experiments.

Read up to and including Step 3 of [Ajax - Getting Started](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started).  Test the example code presented in Step 3.  Do this by adding the code to your root app.html.  

Instead of requesting _test.html_ (as in the example code), request a resource named _message_.  In the server code, return the string _hello ajax_ for requests for _/message_.  Create a module named _message_ to handle these requests.  The message module should resemble the root module provided in the [Buffers assignment](https://github.com/csusbdt/405-2014/wiki/Buffers) because we simply need to return a string of content-type _text/plain; charset=UTF-8_.


