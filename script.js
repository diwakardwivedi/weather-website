
const apiKey = "mhHu1VK28GHXvKWvjzhawLT6NqtppMYJ"; 
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");
  try {
    const locationRes = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${apiKey}`
    );
    const weatherData = await locationRes.json();

    const currentData = weatherData.timelines.minutely[0].values;
    const time = weatherData.timelines.minutely[0].time;

    document.getElementById("weatherData").innerHTML = `
      <div class="section">
        <h2>🌡️ Temperature Info</h2>
        <div class="grid">
          <div class="card"><span>Temperature</span>${currentData.temperature}°C</div>
          <div class="card"><span>Apparent Temp</span>${currentData.temperatureApparent}°C</div>
          <div class="card"><span>Dew Point</span>${currentData.dewPoint}°C</div>
        </div>
      </div>

      <div class="section">
        <h2>☁️ Cloud & Atmosphere</h2>
        <div class="grid">
          <div class="card"><span>Cloud Cover</span>${currentData.cloudCover}%</div>
          <div class="card"><span>Cloud Base</span>${currentData.cloudBase} km</div>
          <div class="card"><span>Cloud Ceiling</span>${currentData.cloudCeiling} km</div>
          <div class="card"><span>Visibility</span>${currentData.visibility} km</div>
        </div>
      </div>

      <div class="section">
        <h2>💧 Humidity & Pressure</h2>
        <div class="grid">
          <div class="card"><span>Humidity</span>${currentData.humidity}%</div>
          <div class="card"><span>Pressure (Sea)</span>${currentData.pressureSeaLevel} hPa</div>
          <div class="card"><span>Pressure (Surface)</span>${currentData.pressureSurfaceLevel} hPa</div>
        </div>
      </div>

      <div class="section">
        <h2>🌬️ Wind Info</h2>
        <div class="grid">
          <div class="card"><span>Speed</span>${currentData.windSpeed} km/h</div>
          <div class="card"><span>Gust</span>${currentData.windGust} km/h</div>
          <div class="card"><span>Direction</span>${currentData.windDirection}°</div>
        </div>
      </div>

      <div class="section">
        <h2>🌦️ Precipitation</h2>
        <div class="grid">
          <div class="card"><span>Rain</span>${currentData.rainIntensity} mm</div>
          <div class="card"><span>Sleet</span>${currentData.sleetIntensity} mm</div>
          <div class="card"><span>Snow</span>${currentData.snowIntensity} mm</div>
          <div class="card"><span>Chance</span>${currentData.precipitationProbability}%</div>
        </div>
      </div>

      <div class="section">
        <h2>🌞 UV Info</h2>
        <div class="grid">
          <div class="card"><span>UV Index</span>${currentData.uvIndex}</div>
          <div class="card"><span>Health Concern</span>${currentData.uvHealthConcern}</div>
        </div>
      </div>

      <div class="section">
        <h2>🕒 Timestamp</h2>
        <div class="card" style="text-align:center;">
          <span>${new Date(time).toLocaleString()}</span>
        </div>
      </div>
    `;
    document.getElementById("cityTitleContainer").innerHTML = `
    <div class="nav-buttons">
        <button id="prevDays">Previous 3 Days</button>
        <button id="nextDays">Upcoming 3 Days</button>
    </div>
    <div id="cityTitle"></div>`;
    document.getElementById("cityTitle").textContent = `${city}'s Weather`;
  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
});
