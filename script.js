const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const CurrentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "67c516a9d98b31f230ca4b47e49f1ea4";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){
return `   <div class="details">
<h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
<h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C </h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.humidity}%</h4> 
</div>
<div class="icon">
<img src=""https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
<h4>${weatherItem[0].description}</h4>
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
    const GEOCODING_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt={cnt}&appid=${API_KEY}`;

fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {

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
    
// When entered can retreive city coordinates (lat, long, and name) from API
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert(`No coordinates found for ${cityName}`);
    const { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon);
}).catch(() => {
alert("An error occurred while featching the coordinates!");
});
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const{ latitude, longitude } = position.coords;
            const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
                const { name } = data[0];
    getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
            alert("An error occurred while featching the city!");
            });
        },
        error => {
            if(error.code === error.PERMISSION_DENIED) {
              alert("Geolocation request denied. Please reset location permission to grant access again.")  
            }
        }

    );
}


locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());