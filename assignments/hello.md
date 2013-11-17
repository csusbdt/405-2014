---
layout: assignment
title: Hello Assignment 
---

## Overview

The purpose of this assignment is to start learning about [Node.js](http://nodejs.org/), which is an execution environment for Javascript designed for building network applications such as Web applications.  This course will show you how to build Web applications using Node.js and CouchDB.

## Assignment folder

Create folder _~/405/hello_ to store the results of your work on this assignment.  When you are finished with this assignment, this folder should contain the following files.

* README.md
* example.js

In README.md add a statement that describes the status of your work on this assignment.

## Install Node.js

Install [Node.js](http://nodejs.org/) if not already avaialble on your system.  (Node is installed on the Linux lab computers.) When you install Node, the Node Package Manager (NPM) also gets installed along with it.  NPM is used to install publicly available modules (Node libraries).

## Read

Read [Wikipedia's entry on HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or consult other sources as needed to solidify your understanding of HTTP.  

<p class="text-warning well">
Having a thorough knowledge of HTTP is essential for most software developers and system administrators.
</p>

Read [About this Documentation](http://nodejs.org/api/documentation.html) from the Node documentation.

## Create and test your first server

Read [the Synopsis page](http://nodejs.org/api/synopsis.html) and do the experiment described in it.

After running the server program, visit the following URL to test: [http://127.0.0.1:8124/](http://127.0.0.1:8124/).

IP address 127.0.0.1 is a special address that represents the _localhost_, which in your case is the computer you are working on.  Try using the URL _http://localhost:8124/_ in your browser as an alternative to 127.0.0.1; this might be easier for you to remember.

Change the message in example.js from _Hello World_ to _Goodbye World_ and then test your modifications.

Change the port number from 8124 to 5000 and then test this change.

Add the files _README.md_ and _example.js_ to the _hello_ folder and commit and push changes.

    cd ~/405
    git add hello/README.md
    git add hello/example.js
    git commit -m "completed hello"
    git push
