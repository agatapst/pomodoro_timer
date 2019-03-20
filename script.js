console.log("Connected");
const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");

var startClicked = false;

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
                clearInterval(timeInterval);
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
var timePaused = false;

btnPause.addEventListener("click", function(){
    timePaused = true;
});




