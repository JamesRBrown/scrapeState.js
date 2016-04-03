# scrapeState.js
Title: Scrape State
Author: James R Brown
Date: 4.2.16

Scrape State is a utility to help scrape pages with PhantomJS.
The idea is to monitor events, and then execute the next function
when events stop coming in.  

Usage:
The user simply adds functions to Scrape Stage and then kicks off
the process with "start".

Setup:
To set this up, be sure to use PhantomJS's events to notify
Scrape State of events and to use PhantomJS's "onLoadStarted"
and "onLoadFinished" to notify Scrape State of page loads.
