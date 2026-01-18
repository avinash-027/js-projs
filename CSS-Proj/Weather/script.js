const apikey = "62972f99525db918d3ea00d1de658ea3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const cityInput = document.querySelector("#inputCity");
const searchBtn = document.querySelector("#searchSubmit");
const WeatherReport = document.querySelector(".Report");

const suggestionsContainer = document.querySelector("#suggestions");
// Fetch suggestions based on user input
const fetchCitySuggestions = async (query) => {
    if (query.length > 2) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apikey}&units=metric`);
        const data = await response.json();

        console.log("data",data);
        console.log( "data list",data.list);

        // Clear previous suggestions
        suggestionsContainer.innerHTML = "";

        if (data.list && data.list.length > 0) {
            // Show suggestions
            data.list.forEach(city => {
                const suggestion = document.createElement('div');
                suggestion.textContent = city.name;
                suggestion.onclick = () => {
                    cityInput.value = city.name;
                    suggestionsContainer.innerHTML = ""; // Clear suggestions after selection
                    fetchWeather(city.name); // Fetch weather for the selected city
                };
                suggestionsContainer.appendChild(suggestion);
            });
        } else {
            console.log("error");
        }
    }
};

const generateWeatherReport = async (event) => {
    event.preventDefault(); // Prevent form submission and page refresh

    const city = cityInput.value.trim();
    if (!city) {
        WeatherReport.innerHTML = "Please Enter a city name";
        return;
    }

    try {
        
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        var data = await response.json();
        console.log(data);

        // Only clear the report if there's an error or no data.
        if (data.cod !== 200) {
            WeatherReport.innerHTML = "Invalid city name. Please try again.";
        } else {
            WeatherReport.innerHTML = `
            <article>
                <header>${city}</header>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </article>
            `;
        }
    } catch (error) {
        console.log(error);
        WeatherReport.innerHTML = "An error occurred. Please try again.";
    }
};

// Add event listener for the search button
searchBtn.addEventListener("click", generateWeatherReport);

// Add event listener to the input field to fetch city suggestions
cityInput.addEventListener("input", (event) => {
    const query = event.target.value;
    fetchCitySuggestions(query);
});