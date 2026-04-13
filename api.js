const apiKey = 'da8d6f7b496732a38799b20196d91d5e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getWeatherByCity(city) {
    const res = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();

    if (data.cod == 404) throw new Error ('City not found');
    return data;
}

export async function getWeatherByCoords(lat, lon) {
    const res = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await res.json();

    if (data.cod == 404) throw new Error('Location not found');
    return data;
}

export async function getForecastByCity(city) {
    const res = await fetch(`${forecastApiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    return await res.json();
}

export async function getForecastByCoords(lat, lon) {
    const res = await fetch(`${forecastApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return await res.json();
}