const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "67c516a9d98b31f230ca4b47e49f1ea4";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATH_API_URL = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;
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