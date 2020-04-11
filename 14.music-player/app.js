const music = document.querySelector("#music");
const playBtn = document.querySelector(".fa-play");
const forwardBtn = document.querySelector(".fa-forward");
const backwardBtn = document.querySelector(".fa-backward");
const wheel = document.querySelector(".rotating-wheel");
const progressBar = document.querySelector(".progress-bar");
let progress,
  previousWidth = null;
console.log(progressBar, music.duration);
let counter = 1;

const playPause = () => {
  if (music.paused) {
    music.play();
    playBtn.className = "fa fa-pause";
    wheel.style.animation = `permanentRotation 550ms linear infinite`;
    let MovePerSec = 200 / music.duration;
    if (previousWidth) {
      progress = setInterval(() => {
        progressBar.style.width = previousWidth + MovePerSec + "px";
        console.log(previousWidth);
        previousWidth = previousWidth + MovePerSec;
        counter++;
      }, 1000);
    } else {
      progress = setInterval(() => {
        progressBar.style.width = counter * MovePerSec + "px";
        previousWidth = counter * MovePerSec;
        counter++;
      }, 1000);
    }
  } else {
    console.log("else");
    music.pause();
    console.log(previousWidth);
    playBtn.className = "fa fa-play";
    wheel.style.animation = ``;
    clearInterval(progress);
  }
};

playBtn.addEventListener("click", playPause);
// progressBar.addEventListener('click', skipToTime);
