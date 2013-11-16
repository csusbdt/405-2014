---
layout: assignment
title: CouchDB Assignment
---

## Overview

The purpose of this assignment is to learn how to setup a database called [CouchDB](http://couchdb.apache.org/).

## Assignment folder

Create a directory named _couch_ for the work you do for this assignment. At the end of the assignment, this folder will contain the following files.

* README.md
* adesign.json
* security.json
* createdb.bat (if on Windows) or createdb.sh (if on OS X or Linux)

## Reading

To fully understand this assignment, you will need to read about CouchDB.
Here are some resources that I used.

* [Introduction](http://docs.couchdb.org/en/latest/intro.html)
* [Get friendly with CouchDB](http://www.relaxed.tv/) (video)
* [CouchDB The Definitive Guide](http://guide.couchdb.org/editions/1/en/index.html)
* [The Antepenultimate CouchDB Reference Card (cheat sheet)](http://jpmens.net/2010/04/20/the-antepenultimate-couchdb-reference-card/)
* [Goodbye, CouchDB](http://sauceio.com/index.php/2012/05/goodbye-couchdb/)
* [Brewer's CAP Theorem](http://www.julianbrowne.com/article/viewer/brewers-cap-theorem)
* [Eventually Consistent - Revisited](http://www.allthingsdistributed.com/2008/12/eventually_consistent.html) I need to read this.

## Instructions

Install CouchDB and start it. When Couch starts, it will open a tab inside your browser
and retrieve the main page of the browser-based interface to the database, called _Futon_.
The instructions in this assignment do not involve this interface,
but it is probably useful to learn.

I can think of 4 ways to interact with a Couch database.

* The browser interface (Futon)
* Command line tools that support the construction of HTTP messages, such as curl
* Directly from a language that supports construction of HTTP messages
* Indirectly through a CouchDB driver written for a specific language

This assignment uses [curl](http://curl.haxx.se/) at the command line to explore how Couch works.

The following instructions assume that you have not yet set an admin password for your database.
If you set the admin password, then you will need to add the admin name and password with each
of the commands given.
For example, if the admin password were _1234_, then the command to get the names of all the databases on the server would be as follows.

    curl -X GET http://root:1234@localhost:5984/_all_dbs

Get an array of names of the databases hosted by the server.

    curl -X GET http://localhost:5984/_all_dbs

Create a database named _test_.

    curl -X PUT http://localhost:5984/test

Verify that the database was created by re-running the command to list the names of all databases.

Verify that the test database contains no documents.

    curl -X GET http://localhost:5984/test/_all_docs

Consider the following Javascript object.

    var obj = { _id: 'a', x: 1};

Suppose we want to store the current state of this object in the test database.
To do this, we need to describe the object using [JSON](http://json.org/) syntax.
We can either write the JSON string manually, or we can use
the JSON.stringify function to determine it for us.
To do this, run the node command line interpreter.

    node

Then, enter the following lines.

    obj = { _id: 'a', x: 1};
    JSON.stringify(obj);

The node command line interpreter displays the value of the expression entered.
The value of _JSON.stringify(obj);_ is the following string.

    '{"_id":"a","x":1}'

The outer apostrophes are used to show that the value is a string;
these are not actually part of the JSON representation of _obj_.
 
Use curl as follows to send add the JSON representation of obj to the test database.
Note that the value for the -d argument needs to be quoted.

~~~
curl -X POST http://localhost:5984/test -H "Content-type: application/json" -d '{"_id":"a","x":1}'
~~~

Verify that the test database contains contains the document.

    curl -X GET http://localhost:5984/test/_all_docs

Insert JSON representations of the following additional Javascript objects.

    { _id: 'b', x: 1}
    { _id: 'c', x: 2}
    { _id: 'd', y: 1}

In a Couch database, documents that have id's that are prefixed with _design
have a special function and are called _design_ documents.
Design documents contain Javascript functions that are run at various times.
One type of design document function is called a view.
I view is used to generate derived data from the database,
similar to an SQL query.

The following design document has an id of _design/adesign_.  It contains a sub-object
named _views_ that contains a single view named _aview_.
This view has map and reduce functions defined.
Couch uses an approach call _MapReduce_ to maintain views efficiently;
you can read about it in
[Introduction to CouchDB Views](http://wiki.apache.org/couchdb/Introduction_to_CouchDB_views).

~~~
{
  "_id" : "_design/adesign",
  "views" : {
    "aview" : {
      "map" : "function(doc) { if (doc.x) emit('x', doc.x); }",
      "reduce" : "function(key, values) { return sum(values); }"
    }
  }
}
~~~

The aview computes the sum of all values for x that exist in documents within the test database.

The design document is inserted into the database in the same way any document is inserted.
Because the design document is relatively large, it is not convenient to include
it in the command line.
Instead, we store the design document as a file and provide the filename in the command line.

Create file _adesign.json_ with contents equal to the design document given above.
Then use the following command to insert it into the test database.

~~~~
curl -X POST http://localhost:5984/test -H "Content-type: application/json" -d @adesign.json
~~~~

Notice the use of '@' in front of the filename.
This tells curl to treat the string as a filename.

Look again at the map function in the design document.
This function is called for each document that gets created or modified in the database.
The following is the function reformatted to read more easily.

~~~~
function(doc) { 
  if (doc.x) {
    emit('x', doc.x); 
  }
}
~~~

Each time the function is called,
the function checks to see of _doc.x_ evaluates to _true_.
If it does, then it invokes a function called _emit_,
which is provided by the Javascript runtime environment of the database.
The function emit returns a pair that is used to update a map
that is maintained by the view.
In our case, we associate the name 'x' with the document x values
for those documents that contain an x value.

Now look at the reduce function.

~~~~
function(key, values) { 
  return sum(values); 
}
~~~~

The reduce function is called to aggregate values returned by the map function.
The second argument of the reduce function (_values_ above)
is an array of values that the reduce functions should aggregate into a single value,
which it returns.
The first argument (_key_ above) provides information about where the values came from.
See [Introduction to CouchDB Views](http://wiki.apache.org/couchdb/Introduction_to_CouchDB_views)
for a detailed explanation.

To see the result of the view, do the following.

~~~~
curl -X GET http://localhost:5984/test/_design/adesign/_view/aview
~~~~

Currently, there are no database users,
so the Couch server runs every operation submitted to it.
To limit what clients can do, we need to create database users.

In Couch, there is a special group of users called _admin_.
Admin users can perform server administration tasks, such as creating and deleting databases.

Creating an admin user keeps non-admin users from performing server administration tasks.
The following command creates an admin user named _admin_ with password _1234_.

~~~~
curl -X PUT http://localhost:5984/_config/admins/admin -d '"1234"'
~~~~

To see that non-authenticated users can no longer create databases,
try to create a database named _x_.

   curl -X PUT http://localhost:5984/x

The above command should now fail because we created an admin user.
To succeed at creating a database,
you need to provide the username and password of an admin user in the HTTP request URL.
The following shows how to do this for our example.

    curl -X PUT http://admin:1234@localhost:5984/x

Creating an admin user keeps others from performing server administration operations.
However, non-authenticated users can still read and write to our test database because
we have not created a security object for it.
Run the following to see that no users are part of the test database's security object.

    curl -X GET http://localhost:5984/test/_security

The security object and security mechanism to support authorization is very flexible.
But we will not investigate this in depth.
Instead, we will use a simple security configuration that makes the admin user the
only user who can write to and read from the database.

Create file _security.json_ with the following contents.

~~~~
{
   "admins" : {
      "roles" : [],
      "names" : ["admin"]
   },
   "readers" : {
      "roles" : [],
      "names" : ["admin"]
   }
}
~~~~

Write this version of the security object into the test database.

~~~~
curl -X PUT http://admin:1234@localhost:5984/test/_security -d @security.json -H "Content-type: application/json"
~~~~

Run the command again to retrieve the security object and observe that you no longer have read
access to it.

    curl -X GET http://localhost:5984/test/_security

Verify that you can also not read any of the documents we inserted into the test database.

    curl -X GET http://localhost:5984/test/a

Now verify that you can perform these reads as the admin user.

    curl -X GET http://admin:1234@localhost:5984/test/_security
    curl -X GET http://admin:1234@localhost:5984/test/a

When developing an application that relies on a database,
it is very useful to have a script that resets the application's database
to a specific state.
This allows you to test for specific functionality that you may be in the
process of developing.
It also allows you to easily delete old data that may not be consistent with
recent changes to application logic.
Create a script file named _createdb.bat_ (if on Windows) or
_createdb.sh_ (if on OS X or Linux) that deletes the test database
and then recreates it with the security object and example documents
used in this assignment.
To write this script,
you need to research the CouchDB documentation to learn how to delete a database.
(The purpose of not providing the answer to you here is that you should
practice accessing the CouchDB documentation to solve problems and expand your understanding.)

It is possible to write to a log file from within design functions.
To illustrate this, add a _bview_ to the design document that uses the following map function.

~~~~
function(doc) {
  log('The doc id is " + doc._id);
}
~~~~

Run the createdb script to recreate your test database.
Then invoke the bview as follows.
(Add admin credentials as needed in subsequent commands.)

~~~~
curl -X GET http://localhost:5984/test/_design/adesign/_view/bview
~~~~

View the contents of the Couch log file to see the result.
Under OS X, the Couch log file is located at _~/Library/Logs/couchdb.log_.
You can view the log as it's being written with the following command.

    tail -f ~/Library/Logs/couchdb.log

Under Linux, the tail command given above is also available,
but the location of the log file will be different.
Use your research skills to determine where this log file is located under Linux.

Under Windows, I don't believe the tail command is available by default.
In this case, just open the file in something like notepad to view its
contents, and re-open the file to see new contents that are added to it.

While trying to understand how map reduce works, I found it helpful to
call the log function inside the map and reduce functions.

