const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
let perSecondRotation = 0;
let perMinuteRotation = 0;
let perHourRotation = 0;

setInterval(() => {
  perSecondRotation += 6;
  second.style.transform = `translate(-140%, -30%) rotate(${perSecondRotation}deg)`;
}, 1000);

setInterval(() => {
  console.log("minute func");
  perMinuteRotation += 6;
  minute.style.transform = `translate(-55%, -30%) rotate(${perMinuteRotation}deg)`;
}, 60000);

setInterval(() => {
  perHourRotation += 30;
  console.log("this is hour func", hour);
  hour.style.transform = `translate(45%, -30%) rotate(${perHourRotation}deg)`;
}, 3600000);
