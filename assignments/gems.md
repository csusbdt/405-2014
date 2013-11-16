---
layout: assignment
title: Gems Assignment
---

## Overview

The learning objectives for this assignment include the following.

* Understand how to implement authentication and authorization.
* Understand how to build a single-page Web application.
* Understand how to store application state on the server side.
* Improve your knowledge and skills with the document object model (DOM).
* Understand how to use localstorage to minimize user login.
* Understand how to implement server-side input validation.
* Understand a simple solution to the problem of stale client-side data.

## Assignment folder

Create a directory named _gems_ for the work you do for this assignment.  This folder should contain your project code and a file README.md with notes.  You should create this folder by cloning the gems repository into '~/405' and
then deleting the .git folder.  Here are the commands to use.

~~~
cd ~/405
git clone https://github.com/csusbdt/gems.git
cd gems
rm -rf .git
~~~

Deleting the .git folder of the cloned gems project
enables you to add the gems project code to your 405 repository.

## Instructions

Study the gems project code to understand its function.
I recorded some videos that explain the gems code and shows what you you need to build
in order to complete this assignment.

After studying the organization of the gems application,
add a game screen with the following elements:

* a text field that shows how many gems the user has
* a text field that shows the user's score in the game
* a button that when clicked consumes a gem and increases the score by one point
* a button to exit to the main menu screen

