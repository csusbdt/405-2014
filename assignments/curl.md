---
layout: assignment
title: Curl Assignment
---

## Overview

The purpose of this assignment is to learn how to use
[the curl command line tool](http://curl.haxx.se/) to send and receive
HTTP messages, which is useful for system administration, debugging and research.

## Assignment folder

Create a directory named _curl_ for the work you do for this assignment.
At the end of the assignment, this folder will contain the following files.

* README.md

## Instructions

Install [curl](http://curl.haxx.se/) if you don't already have it.
(I believe curl is built into OS X but not Windows, but I haven't verified this.)

Read about curl and experiment.

View http://curl.haxx.se/ in a browser and then retrieve it using curl.

    curl -X GET http://curl.haxx.se/

Curl writes the contents of the HTTP response into its standard output stream,
which you can direct to a file.

    curl -X GET http://curl.haxx.se/ > t.html

Now open t.html in your browser.  In Windows, do the following.

    start t.html

In OS X, do the following.

    open t.html

There's probably a way to do it in Linux but I don't know what it is
and it may vary based on distribution.

To look at both headers and message body together, do the following.

    curl -X GET http://curl.haxx.se/ -i

To look only at the response headers, do the following.

    curl -X GET http://curl.haxx.se/ -I

In README.md, include the headers that are returned by the previous GET request.

