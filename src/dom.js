import weatherDataHandler from './weather'
import cloudy from "./assets/cloudy.svg";

let img = document.querySelector(".sidebar > img");
img.src = cloudy;

function displayData(data) {
    console.log(data);
    
    // displaying temperature
    let temperature = document.querySelector(".temperature > h1")
    let temperatureUnit = document.querySelector(".temperature > .unit")
    let {temp} = data;
    if (weatherDataHandler.temperatureUnit == 'C') {
        temperatureUnit.textContent = "\u00B0" + "C";
    } else {
        temperatureUnit.textContent = "\u00B0" + "F";
    }
    temperature.textContent = temp;

    //displaying Day and Time
    const dayInfo = document.querySelector(".day");
    const timeInfo = document.querySelector(".time");
    const {day, time} = data;
    dayInfo.textContent = day;
    timeInfo.textContent = time;

    //displaying condition and rain probability
    const conditionInfo = document.querySelector(".condition");
    const rainInfo = document.querySelector(".rain");
    const {condition, precipitation} = data;
    conditionInfo.textContent = condition;
    rainInfo.textContent = "Rain - " + precipitation + "%";

    //displaying address
    const addressInfo = document.querySelector(".address");
    const {address} = data;
    addressInfo.textContent = address;

}


export {displayData}