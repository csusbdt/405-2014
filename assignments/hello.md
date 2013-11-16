---
layout: assignment
title: Hello Assignment 
---

## Overview

The purpose of this assignment is to start learning about [Node.js](http://nodejs.org/), which is an execution environment for Javascript designed to support network applications.

## Assignment folder

Create a folder named _hello_ in your repository to hold the results of your work on this assignment.  When you are finished with this assignment, the hello folder should contain the following files.

* README.md
* example.js

In README.md add a brief report that describes the status of your work on this assignment.

## Install Node.js

Install Node.js.  The Node Package Manager (NPM) gets installed along with node; this is used to install publicly available modules (Node libraries).

## Read

In the Node.js documentation, read [About this Documentation](http://nodejs.org/api/documentation.html).

Read [Wikipedia's entry on HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or consult other sources as needed to solidify your understanding of HTTP.  Having a thorough knowledge of HTTP is essential for most software developers and system administrators.

## Create and test your first server

Read [the Synopsis page](http://nodejs.org/api/synopsis.html) and do the experiment described in it.
After running the server program, visit the following URL to test: [http://127.0.0.1:8124/](http://127.0.0.1:8124/).  

Note the IP address 127.0.0.1 is the address of the localhost, which is the computer the process is running on.  Try using the URL _http://localhost:8124/_ as an alternative; this might be easier for you to remember.

Change the message from _Hello World_ to _Goodbye World_ and then test your modifications to example.js.

Change the port number from 8124 to 5000 and then test this change.  You will need to change the port number in the URL you enter in the browser.

Add the files _README.md_ and _example.js_ to the _hello_ folder and commit and push changes.

    cd ~/405
    git add hello/README.md
    git add hello/example.js
    git commit -m "completed hello assignment"
    git push

