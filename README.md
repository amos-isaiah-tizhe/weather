This weather app is the first project I developed while learning JavaScript.

It is built mainly for practice and to strengthen my understanding of core JavaScript concepts.

## Features

- Search weather by city name
- Get weather using current location (Geolocation API)
- Display temperature, weather description, and icon
- 3-day weather forecast
- **Humidity and Wind Speed display**
- **"Feels like" temperature (if added later, you can include this)**
- **Dynamic toast notifications for:**
  - Errors (e.g. city not found)
  - Weather conditions (hot, cold, rainy)
- **Custom reusable toast system for better UI feedback**
- Save last searched city using `localStorage`
- Improved UI layout using Flexbox

## What I Learned

While building this project, I focused on:

- Separating **UI logic from application logic**
- Working with **APIs (OpenWeatherMap)**
- Handling **asynchronous JavaScript (async/await)**
- Managing **errors using try...catch**
- Building **reusable functions** (like the toast notification system)
- Understanding **DOM manipulation**
- Improving **user experience (UX)** with loading states and feedback messages

## How It Works

1. User enters a city or uses current location  
2. App fetches weather data from OpenWeather API  
3. Data is processed and displayed on the UI  
4. Forecast data is fetched and displayed  
5. Toast messages provide feedback based on:
   - Errors
   - Temperature conditions
   - Weather conditions (e.g. rain)

## API Setup

### Get your API key from:
https://home.openweathermap.org/users/sign_up

### Base API URL:
https://api.openweathermap.org/data/2.5/weather

## Resources Used

### Boilerplate inspiration:
https://dev.to/iamcymentho/building-a-complete-weather-app-from-scratch-with-html-css-and-javascript-a-step-by-step-guide-30h4

### Google Fonts:

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">

Font Awesome:

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

Important Note:

Current location (Geolocation) will only work on a secure origin.
Make sure your app is served over:

https://

Not:

http://

Live Demo

https://amos-isaiah-tizhe.github.io/weather/

GitHub Repository

https://github.com/amos-isaiah-tizhe/weather

Acknowledgements

OpenWeatherMap API

ChatGPT (for guidance and learning support)

FreeCodeCamp (learning resources)

This project may look simple, but it represents my growth as a JavaScript developer. I am continuously improving it by adding new features and refining the user experience.

Well, i will be adding more features to the project, but am done with this for now as an exercise.
