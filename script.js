// script.js

const apiKey = 'aa9028bccdfa67767ea685c8f9695752'; // ✅ Your API key

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
  const cityName = cityInput.value.trim();
  
  if (cityName === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        weatherInfo.innerHTML = "<p>City not found. Please try again.</p>";
      } else {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherInfo.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${temperature} °C</p>
          <p><strong>Condition:</strong> ${description}</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
}
