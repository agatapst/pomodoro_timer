console.log("Connected");
const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");
const btnReset = document.querySelector("#reset")

var newline = "\r\n";
var startClicked = false;
var timePaused = false;
var timeReset = false; 
var workCycle = 0;
var timeInterval;
var display = document.querySelector("#timerText");

btnStart.addEventListener("click", function() {
    // Timer was clicked before
    if (startClicked){
        timePaused = false;
        console.log("button -start- clicked more than once")
    // Timer was not clicked before
    } else {
        startClicked = true;
        startTimer();
        console.log("button -start- clicked once")
    }
}); 

// Start timer for the first time
function startTimer(){
    var duration = 1/6 * 60;
    timeInterval = setInterval(function() {
        console.log("timePaused:", timePaused);
        if(!timePaused){
            duration--;
            display.textContent = "let's work for" + newline + timeView(duration) + newline + " minutes";
            
            if (duration <= 0) {
                console.log("break!")
                clearInterval(timeInterval);
                workCycle++;
                if (workCycle % 4 == 0){
                    console.log("long break");
                    startBreakLong()
                } else {
                    startBreak();
                    console.log("short break");
                }
            }    
        }   
    }, 1000);     
}

// Display timer
function timeView(time) {
    var minutes = parseInt(time / 60, 10);
    var seconds = parseInt(time % 60, 10); 
    if (seconds >= 10){
        return minutes + ":" + seconds;
    } else {
        return minutes + ":0" + seconds;
    }
}

// Pause timer
btnPause.addEventListener("click", function(){
    timePaused = true;
});

// Break timer [short]
function startBreak(){
    var breakDuration = 5 * 60;
    timeInterval = setInterval(function() {
        if(!timePaused){
            breakDuration--;
            display.textContent = "let's rest for" + newline + timeView(breakDuration) + newline + " minutes";
        
            if (breakDuration <= 0) {
                console.log("the end of break!")
                clearInterval(timeInterval);
                startTimer();
            } 
        }
    }, 1000);
}

// Break timer [long]
function startBreakLong(){
    var breakDurationLong = 15 * 60;
    timeInterval = setInterval(function() {
        if(!timePaused){
        breakDurationLong--;
        display.textContent = "let's rest for" + newline + timeView(breakDurationLong) + newline + " minutes";
        
            if (breakDurationLong <= 0) {
                console.log("the end of long break!")
                clearInterval(timeInterval);
                startTimer();
            }
        } 
    }, 1000);
}

// Reset
btnReset.addEventListener("click", function(){
    display.textContent = "Okay, focus again!"
    clearInterval(timeInterval);
    startClicked = false; 
});


