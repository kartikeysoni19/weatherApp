// OpenWeatherMap API key
const apiKey = '79b54bbf06c19e1180d8bd4b1e029e7f';

// Fetch weather data based on city name
async function fetchWeatherData(city = 'Satna') {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert(error.message);
    }
}

// Update the HTML with the weather data
function displayWeatherData(data) {
    const location = document.getElementById('location');
    const summary = document.getElementById('summary');
    const currentTemp = document.getElementById('current-temp');
    const feelsLikeTemp = document.getElementById('feels-like-temp');
    const highTemp = document.getElementById('high-temp');
    const lowTemp = document.getElementById('low-temp');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');

    location.textContent = `${data.name}, ${data.sys.country}`;
    summary.textContent = `${data.weather[0].description}`;
    currentTemp.textContent = `${Math.round(data.main.temp)}`;
    feelsLikeTemp.textContent = `${Math.round(data.main.feels_like)}`;
    highTemp.textContent = `${Math.round(data.main.temp_max)}`;
    lowTemp.textContent = `${Math.round(data.main.temp_min)}`;
    humidity.textContent = `${data.main.humidity}`;
    windSpeed.textContent = `${data.wind.speed}`;

    // Set weather icon (use OpenWeatherMap icons)
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.style.display = 'block';
}

// Run the fetch function on page load with a default city
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(); // Default location
});

// Add a search feature for city input
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});
