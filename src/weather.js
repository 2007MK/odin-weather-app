import { format } from "date-fns";
import { displayData } from "./dom";

const weatherDataHandler = (function () {
  const API_KEY = "SDKRYJYN3GZ2VRXQSQNAEXEDZ";
  let temperatureUnit = "F";
  let weatherData = {};

  function getWeatherData() {
    return weatherData;
  }

  async function fetchData(location) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`Couldn't fetch the weather data for ${location}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function formatData(location) {
    const data = await fetchData(location);
    console.log(data);

    // main weather icon
    let { icon } = data.currentConditions;
    icon = icon.split("-").join("");
    console.log(icon);

    // temperature
    let { temp } = data.currentConditions;
    if (temperatureUnit == "C") {
      temp = ConvertToCelsius(temp);
    }
    temp = Math.round(temp);

    // day and time
    const dateTimeEpoch = data.currentConditions.datetimeEpoch;
    const dateObj = new Date(dateTimeEpoch * 1000); // convert to JS date
    const day = format(dateObj, "eeee");
    const time = format(dateObj, "hh:mm a");

    // condition
    const condition = data.currentConditions.conditions;

    // precipitation
    const precipitation = data.currentConditions.precipprob;

    // Address
    const address = data.resolvedAddress;

    weatherData = {icon, temp, day, time, condition, precipitation, address}

    displayData(weatherData);
  }

  function ConvertToCelsius(temp) {
    return ((temp - 32) * 5) / 9;
  }

  function ConvertToFahrenheit(temp) {
    return (temp * 9) / 5 + 32;
  }

  function toggleUnit(unit) {
    const data = getWeatherData();
    const mainTemperature = document.querySelector('.temperature > h1');
    console.log(mainTemperature.textContent);
    switch (unit) {
      case "celsius": {
        mainTemperature.textContent = ConvertToCelsius(data.temp);
        weatherData.temp = ConvertToCelsius(data.temp);
        temperatureUnit = "C";
        break;
      }
      case "fahrenheit": {
        mainTemperature.textContent = ConvertToFahrenheit(data.temp);
        weatherData.temp = ConvertToFahrenheit(data.temp);
        temperatureUnit = "F";
        break;
      }
    }
  }

  formatData("mysuru");

  return { temperatureUnit, formatData, toggleUnit, getWeatherData };
})();

export default weatherDataHandler;
