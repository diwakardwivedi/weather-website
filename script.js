
const apiKey = "mhHu1VK28GHXvKWvjzhawLT6NqtppMYJ"; 
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");
  try {
    const locationRes = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${apiKey}`
    );
    const weatherData = await locationRes.json();

    const currentData = weatherData.timelines.daily[0].values;
    const time = weatherData.timelines.daily[0].time;

    document.getElementById("weatherData").innerHTML = `
      <div class="section">
        <h2>🌡️ Temperature Info</h2>
        <div class="grid">
          <div class="card"><span>Temperature</span>${currentData.temperatureAvg}°C</div>
          <div class="card"><span>Real Feel</span>${currentData.temperatureApparentAvg}°C</div>
          <div class="card"><span>Dew Point</span>${currentData.dewPointAvg}°C</div>
        </div>
      </div>

      <div class="section">
        <h2>☁️ Cloud & Atmosphere</h2>
        <div class="grid">
          <div class="card"><span>Cloud Cover</span>${currentData.cloudCoverAvg}%</div>
          <div class="card"><span>Cloud Base</span>${currentData.cloudBaseAvg} km</div>
          <div class="card"><span>Cloud Ceiling</span>${currentData.cloudCeilingAvg} km</div>
          <div class="card"><span>Visibility</span>${currentData.visibilityAvg} km</div>
        </div>
      </div>

      <div class="section">
        <h2>💧 Humidity & Pressure</h2>
        <div class="grid">
          <div class="card"><span>Humidity</span>${currentData.humidityAvg}%</div>
          <div class="card"><span>Pressure (Sea)</span>${currentData.pressureSeaLevelAvg} hPa</div>
          <div class="card"><span>Pressure (Surface)</span>${currentData.pressureSurfaceLevelAvg} hPa</div>
        </div>
      </div>

      <div class="section">
        <h2>🌬️ Wind Info</h2>
        <div class="grid">
          <div class="card"><span>Speed</span>${currentData.windSpeedAvg} km/h</div>
          <div class="card"><span>Gust</span>${currentData.windGustAvg} km/h</div>
          <div class="card"><span>Direction</span>${currentData.windDirectionAvg}°</div>
        </div>
      </div>

      <div class="section">
        <h2>🌦️ Precipitation</h2>
        <div class="grid">
          <div class="card"><span>Rain</span>${currentData.rainIntensityAvg} mm</div>
          <div class="card"><span>Sleet</span>${currentData.sleetIntensityAvg} mm</div>
          <div class="card"><span>Chance</span>${currentData.precipitationProbabilityMax}%</div>
        </div>
      </div>

      <div class="section">
        <h2>🌞 UV Info</h2>
        <div class="grid">
          <div class="card"><span>UV Index</span>${currentData.uvIndexMax}</div>
          <div class="card"><span>Health Concern</span>${currentData.uvHealthConcernMax}</div>
        </div>
      </div>

      <div class="section">
        <h2>🌅 SunRise & SunSet</h2>
        <div class="grid">
          <div class="card"><span>Sun Rise Time</span>${new Date(currentData.sunriseTime).toLocaleTimeString()}</div>
          <div class="card"><span>Sun Set Time</span>${new Date(currentData.sunsetTime).toLocaleTimeString()}</div>
        </div>
      </div>

      <div class="section">
        <h2>🌙 MoonRise & MoonSet</h2>
        <div class="grid">
          <div class="card"><span>Moon Rise Time</span>${new Date(currentData.moonriseTime).toLocaleTimeString()}</div>
          <div class="card"><span>Moon Set Time</span>${new Date(currentData.moonsetTime).toLocaleTimeString()}</div>
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
        <button id="nextDays">Upcoming 5 Days</button>
    </div>
    <div id="cityTitle"></div>`;
    document.getElementById("cityTitle").textContent = `${city}'s Weather`;
  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
});
