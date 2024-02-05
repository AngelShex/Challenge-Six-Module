const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const CurrentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "67c516a9d98b31f230ca4b47e49f1ea4";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){
return `   <div class="details">
<h2>Redlands (2024-02-04)</h2>
<h4>Temperature: 12°C </h4>
<h4>Wind: 8kph</h4>
<h4>Humidity: 81%</h4>  
</div>
<div class="icon">
<img src="https://openweathermap.org/img/wn/10d@4x.png" alt="weather-icon">
<h4>Moderate Rain</h4>
</div>`;
    } else {
        return ` <li class="card">
        <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
        <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C </h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.humidity}%</h4>
    </li>`;
    }
    }

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATH_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt={cnt}&appid=${API_KEY}`;

fetch(WEATH_API_URL).then(res => res.json()).then(data => {

    const uniqueForecastDays = [];
  const fiveDaysForecast = data.list.filter(forecast => {
const forecastDate = new Date(forecast.dt_txt).getDate();
if(!uniqueForecastDays.includes(forecastDate)) {
    return uniqueForecastDays.push(forecasteDate);
}
    });

cityInput.value = "";
CurrentWeatherDiv.innerHTML = "";
weatherCardsDiv.innerHTML = "";


    console.log(fiveDaysForecast);
    fiveDaysForecast.forEach((weatherItem, index) => {
        if(index ===0) {
            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
        } else {
            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
        }
    }); 
}).catch(() => {
    alert("An error occurred while featching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); 
    if(!cityName) return;
const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert(`No coordinates found for ${cityName}`);
    const { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon);
}).catch(() => {
alert("An error occurred while featching the coordinates!");
});
}

searchButton.addEventListener("click", getCityCoordinates);