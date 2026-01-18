// const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true";

// Present Using
const apiUrl01 = "https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=";

// Ex -- 

// website
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
// FOR
// "hourly_units": {
//     "time": "iso8601",
//     "temperature_2m": "°C"

// apiUrl01 == apiUrl

// apiUrl
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
//   "current_weather_units": {
//     "time": "iso8601",
//     "interval": "seconds",
//     "temperature": "°C",
//     "windspeed": "km/h",
//     "winddirection": "°",
//     "is_day": "",
//     "weathercode": "wmo code"
//   },

// apiUrl01
// https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=52.52437&longitude=13.41053
// "current_weather_units": {
//     "time": "iso8601",
//     "interval": "seconds",
//     "temperature": "°C",
//     "windspeed": "km/h",
//     "winddirection": "°",
//     "is_day": "",
//     "weathercode": "wmo code"
//   },

// coordinates
// https://geocoding-api.open-meteo.com/v1/search?name=$Berlin&count=10&language=en&format=json

const searchBtn = document.querySelector("#searchSubmit");
const WeatherReport = document.querySelector(".Report");
const cityInput = document.querySelector("#inputCity");

const fetchCityCoordinates = async (city) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;

    try {
        const response = await fetch(geoUrl);
        const data = await response.json();
        console.log("data ",data);
        
        if (data.results && data.results.length > 0) {
            const { latitude, longitude } = data.results[0];
            return { latitude, longitude };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching Coordinates ", error);
        return null;
    }
}

const fetchWeather = async (city) => {

    const cords = await fetchCityCoordinates(city);

    if (cords) {
        const { latitude, longitude } = cords;

        try {
            WeatherReport.innerHTML = `<span aria-busy="true">Loading...</span>`;


            // apiUrl01
            const response01 = await fetch(`${apiUrl01}${latitude}&longitude=${longitude}`);

            // const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
            const info = await response01.json();

            console.log("info ",info);

            if (info.current_weather) {
                const weather = info.current_weather;

                // format the time
                const weatherTime = new Date(weather.time);
                // Access Date separately
                const formattedDate = weatherTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Access Time separately
                const formattedTime = weatherTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });

                WeatherReport.innerHTML = `
                <article>
                    <header style="text-align:center" ><b>City :</b> ${city.toUpperCase()} <i class="fa-solid fa-city"></i></header>
                    <p><b>Date :</b> ${formattedDate}</p>
                    <p><b>Time :</b> ${formattedTime}</p>
                    <p><b>Temperature :</b> ${weather.temperature}°C</p>
                    <p><b>Wind Speed :</b> ${weather.windspeed} km/h</p>
                    <p><b>Wind Direction :</b> ${weather.winddirection}°</p>
                    <p><b>Weather Code :</b> ${weather.weathercode}</p>
                </article>
                `;
            } else {
                WeatherReport.innerHTML = `<p>No Weather info available..</p>`;
            }
        } catch (error) {
            console.error("Error fetching weather info", error);
            WeatherReport.innerHTML = `<p>Failed to fetch weather info.</p>`;
        }
    } else {
        WeatherReport.innerHTML = `<p>Could not find the city.</p>`;
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Properly prevent form submission if it's inside a form

    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        WeatherReport.innerHTML = `<p>Please enter a city name.</p>`;
    }
});

// tried but not going the way I expected

// const suggestionsContainer = document.querySelector("#suggestions");

// // 
// const handleInput = async(event) => {
//     const query = event.target.value.trim();

//     if (query.length > 2) {
//         const suggestions = await fetchCityCoordinates(query);
        
//         if (suggestions.length > 0) {
//             suggestionsContainer.style.display = 'block';
//             suggestionsContainer.innerHTML = suggestions.map((suggestion) =>` 
//             <div class="suggestion-item" data-lat="${suggestion.latitude}" data-lon="${suggestion.longitude}">
//                     ${suggestion.name}, ${suggestion.country}
//             </div>
//             `).join('');
//         } else {
//             suggestionsContainer.style.display = 'none'
//         }
//     } else {
//         suggestionsContainer.innerHTML = 'none'
//     }
// };

// // list in input changes
// cityInput.addEventListener('input', handleInput);

// // Handle suggestion click
// suggestionsContainer.addEventListener('click', (event) => {
//     if (event.target && event.target.classList.contains('suggestion-item')) {
//         const city = event.target.textContent.split(',')[0].trim();
//         cityInput.value = city;
//         suggestionsContainer.style.display = 'none';
//         fetchWeather(city);
//     }
// });