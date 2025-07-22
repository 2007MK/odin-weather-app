import { format } from "date-fns";
import { displayData } from "./dom";

const weatherDataHandler = (function () {
  const API_KEY = "SDKRYJYN3GZ2VRXQSQNAEXEDZ";
  let temperatureUnit = "F";
  let weatherData = {};

  function getWeatherData() {
    return weatherData;
  }

  function getTemperatureUnit() {
    return temperatureUnit;
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
      console.log(data);

      //getting the data I need

    let mainWeatherIcon = data.currentConditions.icon;
    mainWeatherIcon = mainWeatherIcon.split("-").join("");

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

    
    // Next 7 days forecast
    let next7days = {};
    for (let i = 0; i < 7; i++) {
      let dayData = data.days[i+1];
      const {tempmax, tempmin, icon} = dayData;
      next7days[i] = {tempmax, tempmin,
        icon : dayData.icon.split('-').join(""),
        day: format(new Date(dayData.datetimeEpoch * 1000), "eeee"),
      }
    }
    
    weatherData = {mainWeatherIcon, temp, day, time, condition, precipitation, address, next7days}

    console.log(weatherData);
    displayData();
    } catch (error) {
      console.error(error);
    }
  }

  function ConvertToCelsius(temp) {
    return ((temp - 32) * 5) / 9;
  }

  function ConvertToFahrenheit(temp) {
    return (temp * 9) / 5 + 32;
  }

  function toggleUnit(unit) {
    // const {temp} = getWeatherData();
    //if (temperatureUnit == unit) {
      //return;
    //} else {      
      //const temperatureH1 = document.querySelector('.temperature-and-day > .temperature > h1');
      //switch (unit) {
//        case "C": {
          //weatherData.temp = Math.round(ConvertToFahrenheit(temp));
          //temperatureUnit = "F";
        //}
//        
        //case "F": {
//          weatherData.temp = Math.round(ConvertToCelsius(temp));
          //temperatureUnit = "C";
        //}
        //temperatureH1.textContent = weatherData.temp;
      //}
    //}
  }

  return { getTemperatureUnit, toggleUnit, fetchData, getWeatherData, getTemperatureUnit };
})();

export {weatherDataHandler};
