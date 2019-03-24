const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");
const btnReset = document.querySelector("#reset");

const display = document.querySelector("#timerText");
const workCycleElement = document.querySelector("#cycles"); 
const workAudio = document.getElementById("workAudio"); 
const breakAudio = document.getElementById("breakAudio");

const newline = "\r\n";

const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

let startClickedBefore = false;
let timePaused = false;
let timeReset = false; 
let workCycle = 0;
let timeInterval;  

// Start timer for the first time
function startTimer() {
    let duration = WORK_DURATION;
    workAudio.play();
    timeInterval = setInterval(function() {
        if(!timePaused) {
            duration--;
            display.textContent = "let's work for" + newline + timeView(duration) + newline + " minutes";
            if (duration <= 0) {
                // break starts
                clearInterval(timeInterval);
                workCycle++;
                workCycleElement.textContent = workCycle; 
                if (workCycle % 4 == 0) {
                    startBreak(LONG_BREAK_DURATION);
                } else {
                    startBreak(SHORT_BREAK_DURATION);
                }
            }    
        }  
    }, 1000);    
}

// Display timer
function timeView(time) {
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10); 
    if (seconds >= 10){
        return minutes + ":" + seconds;
    } else {
        return minutes + ":0" + seconds;
    }
}

// Break timer
function startBreak(breakDuration) {
    breakAudio.play();
    timeInterval = setInterval(function() {
        if(!timePaused){
            breakDuration--;
            display.textContent = "let's rest for" + newline + timeView(breakDuration) + newline + " minutes";
            if (breakDuration <= 0) {
                // the end of a break
                clearInterval(timeInterval);
                startTimer();
            } 
        }
    }, 1000);
}

// Start timer
btnStart.addEventListener("click", function() {
    if (startClickedBefore) {
        // Timer was clicked before
        timePaused = false;
    } else {
        // Timer was not clicked before
        startClickedBefore = true;
        startTimer();
    }
});

// Pause timer
btnPause.addEventListener("click", function() {
    timePaused = true;
});

// Reset
btnReset.addEventListener("click", function() {
    display.textContent = "Okay, focus again!";
    clearInterval(timeInterval);
    timePaused = false;
    startClickedBefore = false; 
});
