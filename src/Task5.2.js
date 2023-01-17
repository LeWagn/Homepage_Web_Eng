let activeSpeaker = null;
let speakers = [];

function Speaker(name) {
    this.name = name;
    this.totalTime = 0;
    this.timerID = null;
    this.isPaused = false;
    this.startTime = 0;
    this.currentTime = 0;
}

function startTimer() {
    let speakerName = this.id.split('-')[1];
    if (activeSpeaker) {
        if (activeSpeaker.name === speakerName) {
            if (!activeSpeaker.isPaused) {
                if (activeSpeaker.startTime === 0) {
                    activeSpeaker.startTime = new Date();
                }
                activeSpeaker.currentTime = new Date();
                activeSpeaker.isPaused = false;
                activeSpeaker.timerID = setInterval(updateTimer, 1000);
            } else {
                activeSpeaker.isPaused = false;
                activeSpeaker.currentTime = new Date();
                activeSpeaker.timerID = setInterval(updateTimer, 1000);
            }
        } else {
            clearInterval(activeSpeaker.timerID);
            activeSpeaker.totalTime += (new Date() - activeSpeaker.currentTime) / 1000;
            document.getElementById(`total-time-${activeSpeaker.name}`).innerHTML = formatTime(activeSpeaker.totalTime);
            activeSpeaker = speakers.find(speaker => speaker.name === speakerName);
            activeSpeaker.startTime = new Date();
            activeSpeaker.currentTime = new Date();
            activeSpeaker.timerID = setInterval(updateTimer, 1000);
        }
    } else {
        activeSpeaker = speakers.find(speaker => speaker.name === speakerName);
        activeSpeaker.startTime = new Date();
        activeSpeaker.currentTime = new Date();
        activeSpeaker.timerID = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    activeSpeaker.isPaused = true;
    clearInterval(activeSpeaker.timerID);
}

function stopTimer() {
    clearInterval(activeSpeaker.timerID);
  activeSpeaker.total
  Time += (new Date() - activeSpeaker.currentTime) / 1000;
    document.getElementById(`total-time-${activeSpeaker.name}`).innerHTML = formatTime(activeSpeaker.totalTime);
    activeSpeaker.startTime = 0;
    activeSpeaker.currentTime = 0;
    activeSpeaker.isPaused = false;
}

function updateTimer() {
    let time = (new Date() - activeSpeaker.startTime) / 1000;
    document.getElementById(`current-time-${activeSpeaker.name}`).innerHTML = formatTime(time);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${minutes}:${seconds}`;
}

function addSpeaker(name) {
    let speaker = new Speaker(name);
    speakers.push(speaker);
    let container = document.getElementById("speakers-container");
    let html = `<div id="speaker-${speaker.name}">
                   <h3>${speaker.name}</h3>
                   <p>Current Time: <span id="current-time-${speaker.name}">00:00:00</span></p>
                   <p>Total Time: <span id="total-time-${speaker.name}">00:00:00</span></p>
                   <button id="start-${speaker.name}" onclick="startTimer.call(this)">Start/Stop</button>
                </div>`;
    container.innerHTML += html;
    document.getElementById("add-speaker-form").reset();
}

document.getElementById("add-speaker-form").addEventListener("submit", function(event){
    event.preventDefault();
    addSpeaker(document.getElementById("speaker-name").value);
});