const apiKey = 'da8d6f7b496732a38799b20196d91d5e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const currentLocationBtn = document.getElementById('currentLocation');

currentLocationBtn.addEventListener('click', () => {
  showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        },
        (error) => {
            alert('Location access denied. Please allow location access and try again.');
        }
    );
});
//search click button
searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        showLoading();
        fetchWeather(location);
        localStorage.setItem('lastCity', location);
    }
});
// key press enter
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
function showLoading() {
    temperatureElement.textContent = 'Loading...';
    descriptionElement.textContent = '';
    locationElement.textContent = '';
    weatherIcon.src = '';
}
function updateUI(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.cod == 404) {
    alert('City not found');
    return;
}
updateUI(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// current location function

function fetchWeatherByCoords(lat, lon) {
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
     .then(data => {
    if (data.cod == 404) {
        alert('Location not found');
        return;
    }
updateUI(data);
})
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Load last city when page opens

window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('lastCity');

    if (savedCity) {
      showLoading();
        fetchWeather(savedCity);
    }
});
