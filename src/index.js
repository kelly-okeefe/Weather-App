function refreshWeather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let windSpeed = response.data.wind.speed;
   let feelsLikeElement = document.querySelector("#feels-like");
   let feelsLike = response.data.temperature.feels_like;
   console.log(response);
   cityElement.innerHTML = response.data.city;
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeedElement.innerHTML = `${Math.round(windSpeed)} km/h`;
   temperatureElement.innerHTML = `${Math.round(temperature)}°c`;
   feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°c`;
}

function searchCity(city) {
 let apiKey = "e7f44dtf8936b0ao9a003f375cfb3403";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);