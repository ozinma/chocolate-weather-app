function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) { 
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
            <div class="weather-forecast-date">${formatDay
               (forecastDay.dt)} </div>
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
            }@2x.png" 
            alt="" width="42"
            />
            <div class="weather-forecast-temperature"> 
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)} </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)} </span>   
          </div>
        </div>
        `;
          }
           });
           
            forecastHTML = forecastHTML+`</div>`;
           forecastElement.innerHTML = forecastHTML;
              }

              function gatForecast (coordinates) {
                let apiKey = "094c7bfd473b1f011f590bb136d1e42d";
                let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}& units=metric`;
              axios.get(apiUrl).then(displayForecast);
            }

  function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsuisTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
   "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather.description);

  getForecast (response.data.coord);
}

function search(city) {
  apiKey = "094c7bfd473b1f011f590bb136d1e42d";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsuisLink.classList.remove;
  ("active");
  fahrenheitLink.classList.add;
  ("active");
  let fahrenheitTemperature = ((CelsuisTemperature * 9) / 5) * 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsuisTemperature(event) {
  event.preventDefault();
  celsuisLink.classList.add;
  ("active");
  fahrenheitLink.classList.remove;
  ("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(CelsuisTemperature);
}

let celsuisTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", displayCelsuisTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("New York");
