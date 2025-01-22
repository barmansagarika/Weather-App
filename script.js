async function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = '2ded38925119fd473e4b00f741996578';
    const weatherDataDiv = document.getElementById('weatherData');
  
    if (!city) {
      weatherDataDiv.innerHTML = '<p>Please enter a city name.</p>';
      return;
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your API key.');
        } else if (response.status === 404) {
          throw new Error('City not found. Please check the city name.');
        } else {
          throw new Error('Unable to fetch weather data. Please try again later.');
        }
      }
  
      const data = await response.json();
      const { name, main, weather } = data;
  
      weatherDataDiv.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
      `;
    } catch (error) {
      weatherDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      console.error('Error fetching weather data:', error);
    }
  }
  