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
   let timeElement = document.querySelector("#date-time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#icon");

   cityElement.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeedElement.innerHTML = `${Math.round(windSpeed)} km/h`;
   temperatureElement.innerHTML = `${Math.round(temperature)}°c`;
   feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°c`;
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-icon"/>`;

   getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days [date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}, `;
    
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

function getForecast(city) {
    let apiKey = "e7f44dtf8936b0ao9a003f375cfb3403";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml = 
            forecastHtml +
        `
        <div class="weather-forecast-day">
                <div class="row">
                    <div class="col-2">
                        <div class="weather-forecast-date">
                        <strong>${day}</strong>
                        </div>
                        <div class="weather-forecast-icon">☀️</div>
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">
                              18°
                            </span>
                            <span class="weather-forecast-temperature-min">
                                12°
                            </span>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                `;

    });

forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);