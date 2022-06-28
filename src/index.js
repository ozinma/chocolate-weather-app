function displayTemperature (response) {
    console.log (response.data);
    let temperatureElement = document.querySelector ("#temperature");
    let descriptionElement = document.querySelector ("#description");
    let cityElement = document.querySelector ("#city");
    let humidityElement = document.querySelector ("#humidity");
    let windElement = document.querySelector ("#wind");
    temperatureElement.innerHTML = Math.round (response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather.description;
    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.roun (response.data.wind);

}

apiKey = "d802976f477570e48bb8e76c26f9538d";
apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${API key}&units=metric`;

axios.get(url).then(displayTemperature);
