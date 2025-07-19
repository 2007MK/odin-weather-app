import weatherDataHandler from "./weather";

// importing all the icons
import clearday from "./assets/clear-day.svg";
import clearnight from "./assets/clear-night.svg";
import cloudy from "./assets/cloudy.svg";
import fog from "./assets/fog.svg";
import hail from "./assets/hail.svg";
import partlycloudyday from "./assets/partly-cloudy-day.svg";
import partlycloudynight from "./assets/partly-cloudy-night.svg";
import rainsnowshowersday from "./assets/rain-snow-showers-day.svg";
import rainsnowshowersnight from "./assets/rain-snow-showers-night.svg";
import rainsnow from "./assets/rain-snow.svg";
import rain from "./assets/rain.svg";
import showersday from "./assets/showers-day.svg";
import showersnight from "./assets/showers-night.svg";
import sleet from "./assets/sleet.svg";
import snowshowersday from "./assets/snow-showers-day.svg";
import snowshowersnight from "./assets/snow-showers-night.svg";
import snow from "./assets/snow.svg";
import thunderrain from "./assets/thunder-rain.svg";
import thundershowersday from "./assets/thunder-showers-day.svg";
import thundershowersnight from "./assets/thunder-showers-night.svg";
import thunder from "./assets/thunder.svg";
import wind from "./assets/wind.svg";

const icons = {
  clearday,
  clearnight,
  cloudy,
  fog,
  hail,
  partlycloudyday,
  partlycloudynight,
  rainsnowshowersday,
  rainsnowshowersnight,
  rainsnow,
  rain,
  showersday,
  showersnight,
  sleet,
  snowshowersday,
  snowshowersnight,
  snow,
  thunderrain,
  thundershowersday,
  thundershowersnight,
  thunder,
  wind,
};

// search function
const search = document.querySelector("#search");
const searchBtn = document.querySelector(
  ".search-container > button[type='submit']",
);
searchBtn.addEventListener("click", () => {
  const query = search.value;
  weatherDataHandler.formatData(query);
});

// toggle unit
let unitBtns = document.querySelectorAll(".unitBtn");
unitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    unitBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    if (e.target.id == "celsius") {
      e.target.classList.add("selected");
      weatherDataHandler.toggleUnit("celsius");
    }
    if (e.target.id == "fahrenheit") {
      e.target.classList.add("selected");
      weatherDataHandler.toggleUnit("fahrenheit");
    }
  });
});

function displayData(data) {
  console.log(data);
  // displaying main weather icon [today's weather]
  const { icon } = data;
  let mainWeatherIcon = document.querySelector(".sidebar > img");
  mainWeatherIcon.src = icons[icon];
  // displaying temperature
  const temperature = document.querySelector(".temperature > h1");
  const temperatureUnit = document.querySelector(".temperature > .unit");
  const { temp } = data;
  if (weatherDataHandler.temperatureUnit == "C") {
    temperatureUnit.textContent = "\u00B0" + "C";
  } else {
    temperatureUnit.textContent = "\u00B0" + "F";
  }
  temperature.textContent = temp;

  // displaying Day and Time
  const dayInfo = document.querySelector(".day");
  const timeInfo = document.querySelector(".time");
  const { day, time } = data;
  dayInfo.textContent = day;
  timeInfo.textContent = time;

  // displaying condition and rain probability
  const conditionInfo = document.querySelector(".condition");
  const rainInfo = document.querySelector(".rain");
  const { condition, precipitation } = data;
  conditionInfo.textContent = condition;
  rainInfo.textContent = `Rain - ${precipitation}%`;

  // displaying address
  const addressInfo = document.querySelector(".address");
  const { address } = data;
  addressInfo.textContent = address;
}

function displayIcons() {
  //logic
}

export { displayData, displayIcons };
