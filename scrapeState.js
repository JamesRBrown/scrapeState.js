/*
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
*/

module.exports = (function(){
    var events = 0;                 //track events
    var lastEventCount = 0;         //events since last evaluation
    var started = false;            //Has Scrape State been started
    var pageLoading = false;        //track page loads
    var stageRunning = false;       //trank if we're in the stage process
    var funcArray = [];             //registered functions
    var stageOneTime = 200;         //time to wait in stage one
    var stageTwoTime = 1000;        //time to wait in stage two
    
    var start = function(){
        if(!started){
            started = true;
            runNextFunction();
        }else{
            console.log("Can't start Scrape State more than once!");
        }
    };
    
    var pageLoadStarted = function(){
        pageLoading = true;
    };
    
    var pageLoadFinished = function(){
        pageLoading = false;
        if(started && !stageRunning){
            events = 0;
            lastEventCount = 0;
            stageOne();
        }
    };
        
    var stageOne = function(){
        if(pageLoading) stageComplete();
        
        if(stageRunning){
            if(events === lastEventCount){
                setTimeout(stageTwo, stageTwoTime);
            }else{
                lastEventCount = events;
                setTimeout(stageOne, stageOneTime);
            }  
        }
              
    };
    
    var stageTwo = function(){
        if(pageLoading) stageComplete();
        
        if(stageRunning){
            if(events === lastEventCount){
                runNextFunction();
            }else{
                stageOne();
            }
        }
        
    };
    
    var runNextFunction = function(){
        funcArray.shift()();
    };
    
    var stageComplete = function(){
        stageRunning = false;
    };
    
    var setStageOneTime = function(time){
        stageOneTime = time;
    };
    
    var setStageTwoTime = function(time){
        stageTwoTime = time;
    };
    
    var incrementEvents = function(){
        events++;
    };
    
    var addFunction = function(func){
        if(!started){
            funcArray.push(func);
        }else{
            console.log("Can't add functions once Scrape State is started!");
        }
    };
    
    
    
    return {
        start: start,
        pageLoadStarted: pageLoadStarted,
        pageLoadFinished: pageLoadFinished,
        incrementEvents: incrementEvents,
        addFunction: addFunction,
        setStageOneTime: setStageOneTime,
        setStageTwoTime: setStageTwoTime
    };
})();
