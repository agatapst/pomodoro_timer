console.log("Connected");
const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");

var startClicked = false;
var timePaused = false;
var workCycle = 0;

btnStart.addEventListener("click", function() {
    // Timer was not clicked before
    if (!startClicked){
        startClicked = true;
        startTimer();
        console.log("button -start- clicked once")
        
        // Timer was clicked before
    } else {
        timePaused = false;
        console.log("button -start- clicked more than once")
    }
}); 


// Start timer for the first time
function startTimer(){
    var duration = 25 * 60;
    var display = document.querySelector("#time");
    var timeInterval = setInterval(function() {
        console.log("timePaused:", timePaused);
        if(!timePaused){
            duration--;
            display.textContent = timeView(duration);
            
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
    var display = document.querySelector("#break");
    
    var breakInterval = setInterval(function() {
        breakDuration--;
        display.textContent = timeView(breakDuration);
        
        if (breakDuration <= 0) {
            console.log("the end of break!")
            clearInterval(breakInterval);
            startTimer();
        } 
    }, 1000);
}

// Break timer [long]
function startBreakLong(){
    var breakDurationLong = 15 * 60;
    var display = document.querySelector("#break");
    
    var breakIntervalLong = setInterval(function() {
        breakDurationLong--;
        display.textContent = timeView(breakDurationLong);
        
        if (breakDurationLong <= 0) {
            console.log("the end of long break!")
            clearInterval(breakIntervalLong);
            startTimer();
        } 
    }, 1000);
}

