//COMPLETED

const cityName = document.querySelector(".primary-heading");
const temp = document.querySelector(".secondary-heading");
const weatherImg = document.querySelector(".weather-img");
const weatherName = document.querySelector(".weather-name");
const tempSelector = document.querySelector(".temp-toggler-feild");
let weather;

let longitude, latitude;
const key = "ee072ad87231d669baedf52edb20bf0d";

window.addEventListener("load", () => {
  if (navigator.geolocation.getCurrentPosition(getlocation)) {
    navigator.geolocation.getCurrentPosition(getlocation);
  } else {
  }
});

const getlocation = (position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  weatherInfo();
};

const renderWeatherImg = (type) => {
  switch (type) {
    case "clear":
      weatherImg.src = "./icons/01d.png";
      break;
    case "haze":
      weatherImg.src = "./icons/03d.png";
      break;
    case "cloud":
      weatherImg.src = "./icons/04d.png";
      break;
    case "rain":
      weatherImg.src = "./icons/09n.png";
      break;
    case "snow":
      weatherImg.src = "./icons/13d.png";
      break;
    default:
      weatherImg.src = "./icons/unknown.png";
  }
};

const changeTempFormat = (currTemp) => {
  if (tempSelector.checked) {
    return toFarenheit(currTemp);
  } else {
    return toCelius(currTemp);
  }
};

const toCelius = (temp) => {
  return temp - 273;
};
const toFarenheit = (temp) => {
  return ((temp * 9) / 5 - 459.67).toFixed(2);
};
const renderConvertedTemp = (currTemp) => {
  const convertedTemp = changeTempFormat(currTemp);
  if (tempSelector.checked) {
    temp.innerHTML = `${convertedTemp} <span><sup>o</sup>F</span>`;
  } else {
    temp.innerHTML = `${convertedTemp} <span><sup>o</sup>C</span>`;
  }
};

const render = () => {
  cityName.innerHTML = weather.city;
  weatherName.innerHTML = weather.discription;
  renderConvertedTemp(parseInt(weather.temp));
  renderWeatherImg(weather.discription.toLowerCase());
};

const gatherResponse = (response) => {
  weather = {
    city: response.name,
    discription: response.weather[0].main,
    temp: response.main.temp_max,
  };
  render();
};

const weatherInfo = () => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`,
    true
  );

  xhr.onreadystatechange = function () {
    if (this.status !== 200) {
      document.querySelector(".spinner").style.display = "block";
    } else {
      console.log(this.status);
      document.querySelector(".spinner").style.display = "none";
    }
  };

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      gatherResponse(response);
    } else {
      console.log("somthing went wrong");
    }
  };

  xhr.send();
  tempSelector.addEventListener("click", render);
};
