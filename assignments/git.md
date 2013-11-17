---
layout: assignment
title: Git Assignment
---

## Overview

In this course, you will submit your work by writing files into a
remote Git repository that I set up for you.
In order for me to set up this repository for you,
I need a copy of the public key on your computer that your Git client
program uses when connecting to remote hosts.

After I receive this from you, I will create an empty
remote repository for you to push commits into and then
I will send you instructions on how to clone 
this repository onto your local computer.

In the top level of this cloned repository, 
you will create a folder for each assignment that you complete.

## SSH keys and tutorials

Follow [these Git submission instructions](https://github.com/csusbdt/centos/blob/master/GIT-SUBMISSION.md)
to prepare your system for using Git in this course.

<p class="text-warning">Make sure that you do the reading and tutorials identified at the end of the instructions
while you wait for me to create the remote repository for you.</p>

## Assignment folder

After you clone the remote repository,
you will create a folder within it named _git_ to store the results of your work on this assignment.
When you are finished with this assignment, the git folder should contain the following files.

* README.md
* ...files you created for experimentation...

## Instructions

While you are waiting to receive the clone command from me,
complete [the TryGit tutorial](http://try.github.io/levels/1/challenges/1).

After completing the TryGit tutorial, familiarize yourself with
[the documentation for Git](http://git-scm.com/doc)
and [the Git book](http://git-scm.com/book).
If you want to thoroughly understand Git, you should carefully read 
[Chapter 9 on Git Internals](http://git-scm.com/book/en/Git-Internals).

When you receive an email from me with the clone command,
run the command in your home directory.
This will create a folder named _405_ in your home directory.
From this point on, I will refer to this folder by the expression
_~/405_.

<p class="well text-muted">Tilda '~' represents a home directory on Unix-like
operating systems such as Linux and OS X.</p>

In _~/405_ you will see a file named README.md, which contains some instructions
to help you configure git on your system.

The file's extension _.md_ stands for _markdown_,
which is a markup language that's designed to be readable in both raw and interpreted forms.
You can think of it as a lightweight substitute for HTML that many programmers use.
You should read about [the Markdown syntax](http://daringfireball.net/projects/markdown/syntax),
because each assignment folder that you create should contain a README.md file.

For this assignment, create a folder named _git_ within _~/405_.

In _~/405/git_ create a file README.md that describes the documentation you read
and the experiments that you performed while completing this assignment.

Also in _~/405/git/README.md_ add a link to your Code School report card,
which shows that you have completed the Try Git tutorial.
[Here is my report card](http://www.codeschool.com/users/csusbdt).

Use the following commands to push changes to your README.md file to your remote repository.

<pre>
cd ~/405
git add git/README.md
git commit -m "completed git assignment"
git push
</pre>
