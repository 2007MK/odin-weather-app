import { weatherDataHandler } from "./weather";
import { displayData } from "./dom";
const render = (function () {
  function sidebar() {
    let container = document.querySelector(".container");
    let sidebar = document.querySelector(".sidebar");
    let searchContainer = document.createElement("div");
    searchContainer.setAttribute("class", "search-container");
    let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "search");
    searchBar.setAttribute("name", "search");
    searchBar.setAttribute("id", "search");
    searchBar.setAttribute("placeholder", "Search for places...");

    let searchBtn = document.createElement("button");
    searchBtn.setAttribute("type", "submit");
    searchBtn.textContent = "Search";

    searchBtn.addEventListener("click", () => {
      let query = search.value;
      weatherDataHandler.fetchData(query)
    })

    // main weather icon
    let img = document.createElement("img");
    img.src = "";

    let temperatureAndDay = document.createElement("div");
    temperatureAndDay.setAttribute("class", "temperature-and-day");

    let temperature = document.createElement("div");
    temperature.setAttribute("class", "temperature");

    let h1 = document.createElement("h1");
    let unit = document.createElement("sup");
    unit.setAttribute("class", "unit");

    let dayAndTime = document.createElement("div");
    dayAndTime.setAttribute("class", "day-and-time");
    let day = document.createElement("span");
    day.setAttribute("class", "day");
    let time = document.createElement("span");
    time.setAttribute("class", "time");

    let hr = document.createElement("hr");

    let weatherInfo = document.createElement("div");
    weatherInfo.setAttribute("class", "weather-info");
    let condition = document.createElement("div");
    condition.setAttribute("class", "condition");
    let rain = document.createElement("rain");
    rain.setAttribute("class", "rain");

    let address = document.createElement("div");
    address.setAttribute("class", "address");
    let p = document.createElement("p");

    searchContainer.appendChild(searchBar);
    searchContainer.appendChild(searchBtn);

    temperature.appendChild(h1);
    temperature.appendChild(unit);

    dayAndTime.appendChild(day);
    dayAndTime.appendChild(time);

    temperatureAndDay.appendChild(temperature);
    temperatureAndDay.appendChild(dayAndTime);

    weatherInfo.appendChild(condition);
    weatherInfo.appendChild(rain);

    address.appendChild(p);

    sidebar.appendChild(searchContainer);
    sidebar.appendChild(img);
    sidebar.appendChild(temperatureAndDay);
    sidebar.appendChild(hr);
    sidebar.appendChild(weatherInfo);
    sidebar.appendChild(address);

    container.appendChild(sidebar);
  }

  function main() {
    let main = document.querySelector('.main');
    
    // rendering header
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    let toggleUnit = document.createElement('div');
    toggleUnit.setAttribute('class', 'toggleUnit');
    let btnCelsius = document.createElement('button');
    btnCelsius.setAttribute('class', 'unitBtn');
    btnCelsius.id = "celsius";
    btnCelsius.textContent = '\u00B0' + 'C';
    let btnFahrenheit = document.createElement('button');
    btnFahrenheit.setAttribute('class', 'unitBtn');
    btnFahrenheit.id = "fahrenheit";
    btnFahrenheit.textContent = '\u00B0' + 'F';
    btnFahrenheit.classList.add('selected')

    toggleUnit.appendChild(btnCelsius);
    toggleUnit.appendChild(btnFahrenheit);

    header.appendChild(toggleUnit);

    main.appendChild(header);


    //rendering forecast
    let forecast = document.createElement('div');
    forecast.setAttribute('class', 'forecast');
    //generating the cards for the next 7 days
    for (let i = 0; i < 7; i++) {
      let cardSmall = document.createElement('div');
      cardSmall.setAttribute('class', 'card-small');
      let dayOfTheWeek = document.createElement('h3');
      dayOfTheWeek.setAttribute('class', 'dayOfTheWeek');
      let img = document.createElement('img');
      img.setAttribute('class', 'weather-icon');
      img.src = "";
      let temp = document.createElement('div');
      temp.setAttribute('class', 'temp');
      let maxTemp = document.createElement('span');
      maxTemp.setAttribute('class', 'max-temp');
      let minTemp = document.createElement('span');
      minTemp.setAttribute('class', 'min-temp');

      dayOfTheWeek.textContent = "Sun";
      maxTemp.textContent = "15" + "\u00B0";
      minTemp.textContent = "15" + "\u00B0";

      temp.appendChild(maxTemp);
      temp.appendChild(minTemp);
      cardSmall.appendChild(dayOfTheWeek);
      cardSmall.appendChild(img);
      cardSmall.appendChild(temp);

      forecast.appendChild(cardSmall);
    }
    
    main.appendChild(forecast);
  }

  return { sidebar, main };
})();

export { render };
