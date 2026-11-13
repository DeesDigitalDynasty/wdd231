// OpenWeatherMap API Configuration for Ibadan, Nigeria
const apiKey = "dc405992dbfccfd57fbe1db4e62b06ef";
const lat = 7.3775;
const lon = 3.9470;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const membersUrl = "data/members.json";

// Fetch Weather Data
const getWeather = async () => {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
        document.querySelector("#current-weather").textContent = "Weather data unavailable.";
    }
};

const displayCurrentWeather = (data) => {
    const currentWeatherDiv = document.querySelector("#current-weather");
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);

    currentWeatherDiv.innerHTML = `
        <p><strong>Ibadan, NG</strong></p>
        <p class="weather-temp">${temp}&deg;C - ${capitalizedDesc}</p>
    `;
    getForecast();
};

// Fetch 3-Day Forecast
const getForecast = async () => {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`Forecast fetch failed: ${response.status}`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
};

const displayForecast = (data) => {
    const forecastContainer = document.querySelector("#forecast-container");
    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";
    
    // Filter list for roughly 24-hour intervals
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    const forecastList = document.createElement("ul");
    forecastList.classList.add("forecast-list");

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        
        const li = document.createElement("li");
        li.innerHTML = `<span>${dayName}:</span> <strong>${temp}&deg;C</strong>`;
        forecastList.appendChild(li);
    });

    forecastContainer.appendChild(forecastList);
};

// Fetch and Render Random Member Spotlights
const getSpotlights = async () => {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`Members fetch failed: ${response.status}`);
        const data = await response.json();
        
        
        const eliteMembers = data.members.filter(member => 
            member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
        );

        // Randomly select 2 members
        const shuffled = eliteMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2); 

        displaySpotlights(selected);
    } catch (error) {
        console.error("Error loading spotlight data:", error);
    }
};

const displaySpotlights = (members) => {
    const spotlightContainer = document.querySelector("#spotlight-container");
    spotlightContainer.innerHTML = "<h2>Business Spotlight</h2>";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-item");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="80" height="80" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Level:</strong> ${member.membershipLevel} Member</p>
            <p>${member.phone} | ${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
};

// Initialize Home Page
getWeather();
getSpotlights();