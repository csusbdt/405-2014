---
layout: assignment
title: Caching Assignment
---

## Overview

The purpose of this assignment is to learn about HTTP caching mechanisms and how to make use of them in a single-page web application.  A good place to start is by reading [Caching Tutorial](http://www.mnot.net/cache_docs/).

Retrieving data from the Internet is slow relative to retrieving from the local file system.  Also, retrieving data over the Internet will consume bandwidth, which is a cost for the application provider and user.  Because many Web accessible resources, such as HTML, images, video, etc. don't change frequently, it makes economic sense to retrieve these resources once over the network, store the data in the local file system, and then read from the file system when needed subsequently.  This process is referred to as _caching_. 

There are 2 places where caching of HTTP data can occur:

* on the local computer by the browser, and
* on a remote computer, called a cache server, that is controlled by your Internet service provider, application provider, or other intermediary interested in conserving bandwidth.

The HTTP protocol includes headers that can be used by client and server to exchange information that is relevant to caching.  For instance, some resources should not be cached because they are changing.  In this case, we would include headers and maybe add a random string to the request URL to ensure that the resource is never delivered from cache storage.

This assignment will illustrate the following 2 techniques.

* How to control caching through the use of ETags.
* How to avoid caching of changing data.

This assignment is focused on controlling caching through ETags.
It is also possible to control caching with expiration times,
but this is not covered in this assignment.

## Assignment folder

Create a directory named _cache_ for the work you do for this assignment. At the end of the assignment, this folder will contain the following files.

* README.md
* app.html
* main.js
* root.js
* image.js
* message.js

## Instructions

You should start the assignment by making a copy of all the files from the [Ajax assignment](https://github.com/csusbdt/405-2014/wiki/Ajax).  This will be the starting point for this assignment.

Verify that your server works correctly.

### ETags

Servers can optionally return an ETag header for objects it returns to requesting clients.
The ETag header contains a string that identifies the version of the object being returned.
Try the following experiments to get a better understanding of how ETags work.

View the HTTP response headers when requesting http://curl.haxx.se/.

    curl -X GET http://curl.haxx.se/ -I

These are the headers that I got.

~~~~
HTTP/1.1 200 OK
Date: Sun, 01 Sep 2013 18:26:09 GMT
Server: Apache
Last-Modified: Sun, 01 Sep 2013 18:25:04 GMT
ETag: "1a9eea-2d7b-4e55693100e05"
Accept-Ranges: bytes
Content-Length: 11643
Vary: Accept-Encoding
Content-Type: text/html
~~~~

Notice the ETag header. If a browser caches the content returned from a request with an ETag header,
then it should also store the ETag value with it.
The next time the user navigates to the page,
the browser should send a request for the page with the following header.

    If-None-Match: "1a9eea-2d7b-4e55693100e05"

If the document at the server has not been revised since the last request,
then the ETag will not have changed.
In this case the browser returns a _304 Not modified_ response.
In the following, replace the ETag that I provide with the actual ETag that you received.
Also note that _-H_ is used to specify a header for curl to use in its request.

    curl -X GET http://curl.haxx.se/ -I -H "If-None-Match: \"1a9eea-2d7b-4e55603f21de2\""

The 304 response code informs the browser that the document
in its cache is current.

To see the result of sending a non-matching ETag, try to the following.

    curl -X GET http://curl.haxx.se/ -I -H "If-None-Match: 1234"

Observe that the server returns a 200 response code,
which means it has included the document in the body of the response.
Also observe that the server includes an ETag header that identifies
the current version of the document.

The concept of an ETag is identical to the concept of a version identifier.

### Nodejs implementation

Use the following code to generate an _ETag_ based on the contents of app.html that is read at server start up.

````
function generateETag(buffer) {
  var shasum = require('crypto').createHash('sha1');
  shasum.update(buffer, 'binary');
  return shasum.digest('hex');
}
````

Generating ETags from file contents is convenient because the ETag will take on a new value when the file changes.  For this to work in our case, the server needs to be restarted when the file changes.

Add code that adds the ETag header for requests for the root resource.

Add code that checks the ETag sent by the browser for requests for the root resource.
If the supplied ETag matches the ETag for app.html, then return a _304 Not modified_ response.
If the ETag does not match, then return the app.html as usual, including the new ETag value.

The following code shows how to return a 304 Not modified response.  The code sets the
expiration date to a time that is a little under a year.
````
replyNotModified = function(res) {
  res.writeHead(304, {
    'Connection'       : 'keep-alive',
    'Proxy-Connection' : 'keep-alive',
    'Cache-Control'    : 'max-age=30000000',
    'Expires'          : new Date(Date.now() + 30000000000).toUTCString()
  });
  res.end();
};
````

Use a Web traffic inspection tool to see if your browser checks the ETag for requests it makes after retrieving the root resource.  Caching by browsers is optional so your browser may choose not
to store the object and its ETag.  Safari in particular might not respect the ETag you send it.
If this is the case with the browser you are using then
try a different browser to test your code.

Change the image data and restart the server.  Verify that the browser retrieves the new image data after this change and subsequently relies on its cache.

### Ajax

Some browsers cache responses to Ajax requests even when using the POST method.
See [Is Safari on iOS 6 caching $.ajax results?](http://stackoverflow.com/questions/12506897/is-safari-on-ios-6-caching-ajax-results).

In this assignment we will assume that the message returned by the server should never be cached.
Do the following 3 things to increase the likelihood the response is not cached.

* Add a random string to the URL parameters that the browser sends to the server.
* Add the following header to your response: _Pragma: no-cache_
* Add the following header to your response: _Cache-Control: no-cache, no-store_

Use a Web traffic inspection tool to verify that the browser always retrieves the message.

