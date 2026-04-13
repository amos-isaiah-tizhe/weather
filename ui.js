const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const forecastElement = document.getElementById('forecast');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const feelsLikeElement = document.getElementById('feelsLike');

export function showLoading() {
    temperatureElement.textContent = 'Thinking...';
    descriptionElement.textContent = '';
    locationElement.textContent = '';
    weatherIcon.src = '';
}

export function updateUI(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    humidityElement.querySelector('.stat-value').textContent = `${data.main.humidity}%`;
windSpeedElement.querySelector('.stat-value').textContent = `${data.wind.speed} m/s`;
feelsLikeElement.querySelector('.stat-value').textContent = `${Math.round(data.main.feels_like)}°C`;
}

export function updateForecastUI(data) {
    forecastElement.innerHTML = '';

    const dailyData = data.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;

        forecastElement.innerHTML += `
            <div class="forecast-item">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" />
                <p>${temp}°C</p>
            </div>
        `;
    });
}

// Remove any existing toast
export function clearToast() {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
}

// Show toast (error, success, info)
export function showToast(message, type = 'error') {
    // Remove old toast first
    clearToast();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Auto remove after 3s
    setTimeout(() => {
        toast.remove();
    }, 3000);
}