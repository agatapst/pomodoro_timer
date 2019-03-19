console.log("Connected");

// Start
const btnStart = document.querySelector("#start");

btnStart.addEventListener("click", function() {
    var duration = 25 * 60;
    var display = document.querySelector("#time");

    var timeInterval = setInterval(function() {
        console.log("timePaused:", timePaused);
        if(timePaused == false){
            duration--;
            display.textContent = timeView(duration);

            if (duration <= 0) {
                clearInterval(timeInterval);
            }
        } 
    }, 1000);
});

function timeView(time) {
    var minutes = parseInt(time / 60, 10);
    var seconds = parseInt(time % 60, 10); 

    if (seconds >= 10){
        return minutes + ":" + seconds;
    } else {
        return minutes + ":0" + seconds;
    }
}

// Pause
const btnPause = document.querySelector("#pause");
var timePaused = false;

btnPause.addEventListener("click", function(){
    timePaused = true;
});