import {displayData} from './dom'
import {format } from 'date-fns';

const weatherDataHandler = (function () {
  const API_KEY = "SDKRYJYN3GZ2VRXQSQNAEXEDZ";
  let temperatureUnit = "F"

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


  async function formatData() {
    let data = await fetchData('bengaluru')
    console.log(data)

    // temperature
    let temp = data.currentConditions.temp;
    if (temperatureUnit == 'C') {
      temp = ConvertToCelsius(temp);
    }
    temp = Math.round(temp);


    //day and time
    let dateTimeEpoch = data.currentConditions.datetimeEpoch;
    let dateObj = new Date(dateTimeEpoch * 1000); // convert to JS date
    const day = format(dateObj, "eeee");
    const time = format(dateObj, "hh:mm a");
    
    //condition
    const condition = data.currentConditions.conditions;

    //precipitation
    const precipitation = data.currentConditions.precipprob * 100;

    //Address
    const address = data.resolvedAddress;




    displayData({temp, day, time, condition, precipitation, address})
  }


  function ConvertToCelsius(temp) {
    return ((temp - 32) * 5) / 9;
  }

  formatData();

  return {temperatureUnit}

})();


export default weatherDataHandler;
