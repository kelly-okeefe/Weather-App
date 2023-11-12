function refreshWeather(response) {
   let temperatureElement = document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   console.log(response);
   cityElement.innerHTML = response.data.city;
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = response.data.temperature.humidity;
   temperatureElement.innerHTML = Math.round(temperature);
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