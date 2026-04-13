import {
    getWeatherByCity,
    getWeatherByCoords,
    getForecastByCity,
    getForecastByCoords
} from './api.js';

import {
    showLoading,
    updateUI,
    updateForecastUI,
    showToast,
    clearToast
} from './ui.js';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const currentLocationBtn = document.getElementById('currentLocation');


// Reusable weather message function
function showWeatherMessage(weather) {
    setTimeout(() => {
        if (weather.main.temp > 35) {
            showToast('It’s very hot!', 'info');
        } else if (weather.main.temp < 15) {
            showToast('It’s quite cold!', 'info');
        } else if (weather.weather[0].main === 'Rain') {
            showToast('Don’t forget your umbrella ☔', 'info');
        } else {
            showToast('Weather loaded successfully!', 'success');
        }
    }, 300);
}


// SEARCH
searchButton.addEventListener('click', async () => {
    const city = locationInput.value.trim();

    if (!city) {
        showToast('Please enter a city name', 'info');
        return;
    }

    try {
        clearToast();
        showLoading();

        // PARALLEL FETCH (FAST)
        const [weather, forecast] = await Promise.all([
            getWeatherByCity(city),
            getForecastByCity(city)
        ]);

        updateUI(weather);
        updateForecastUI(forecast);

localStorage.setItem('weatherData', JSON.stringify(weather));
localStorage.setItem('forecastData', JSON.stringify(forecast));

        showWeatherMessage(weather);

        localStorage.setItem('lastCity', city);

    } catch (err) {
        showToast(err.message, 'error');
    }
});


// ENTER KEY
locationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        locationInput.blur();
        searchButton.click();
    }
});


// GEOLOCATION
currentLocationBtn.addEventListener('click', () => {
    showLoading();

    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            clearToast();

            const { latitude, longitude } = pos.coords;

            // PARALLEL FETCH
            const [weather, forecast] = await Promise.all([
                getWeatherByCoords(latitude, longitude),
                getForecastByCoords(latitude, longitude)
            ]);

            updateUI(weather);
            updateForecastUI(forecast);

            showWeatherMessage(weather);

        } catch (err) {
            showToast(err.message, 'error');
        }
    });
});


// LOAD LAST CITY
window.addEventListener('load', async () => {
    const savedCity = localStorage.getItem('lastCity');
    const cachedWeather = localStorage.getItem('weatherData');
    const cachedForecast = localStorage.getItem('forecastData');

    // SHOW CACHED DATA FIRST (instant)
    if (cachedWeather && cachedForecast) {
        updateUI(JSON.parse(cachedWeather));
        updateForecastUI(JSON.parse(cachedForecast));
    }

    // FETCH FRESH DATA
    if (savedCity) {
        try {
            const [weather, forecast] = await Promise.all([
                getWeatherByCity(savedCity),
                getForecastByCity(savedCity)
            ]);

            updateUI(weather);
            updateForecastUI(forecast);

            // update cache again
            localStorage.setItem('weatherData', JSON.stringify(weather));
            localStorage.setItem('forecastData', JSON.stringify(forecast));

        } catch (err) {
            showToast(err.message, 'error');
        }
    }
});