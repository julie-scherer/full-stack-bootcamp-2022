console.log('Hello checking that we are connected!');

getCurrentLocation();

// 
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
async function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    let weatherData = await weatherRes.json();
    displayWeather(weatherData);
}



const formatTemp = (K) => `${(((Number(K)-273.15)*1.8)+32).toFixed(0)}°F`;
const formatDate = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday"];
    let weekday = weekdays[date.getDay()];
    return weekday;
}
const formatTime = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds
    let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
}

// 1. get city weather calls display weather function
async function getCityWeather(event) {
    event.preventDefault();
    let city = event.target.cityLookup.value;
    let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    let weatherData = await weatherRes.json();
    displayWeather(weatherData);
}

// 2. display weather function calls get forecast function
function displayWeather(data) {
    console.log(data);
    let weatherDisplay = document.querySelector(".weatherDisplay");

    let currCity = document.querySelector("#currCity");
    currCity.innerHTML = data.name;
    
    let logoImg = document.querySelector("#logoImg");
    let icon =  data.weather[0].icon;
    logoImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="100px" />`;    
    
    let currDescript = document.querySelector("#currDescript");
    let description = data.weather[0].description;
    currDescript.innerHTML = description.toUpperCase();

    let currTemp = document.querySelector("#currTemp");
    let mainTemp = formatTemp(data.main.temp);
    currTemp.innerHTML = mainTemp;

    let currWind = document.querySelector("#currWind");
    let windSpeed = '<img src="/images/wind.png" alt="" width="20px" /> ' + data.wind.speed + ' m.p.h.';
    currWind.innerHTML = windSpeed;

    let currHumid = document.querySelector("#currHumid");
    let humidity = '<img src="/images/raindrop.png" alt="" width="15px" /> ' + data.main.humidity + '% humid';
    currHumid.innerHTML = humidity;

    getForecast(data.coord)
}

// 3. get forecast function calls display forecast function
async function getForecast(coordinates) {
    let forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`)
    let forecastData = await forecastRes.json();
    // console.log(forecastData);
    displayForecast(forecastData);
}

// 4. display forecast function
function displayForecast(data) {
    console.log(data);

    let dailyForecast = data.daily;
    let forecastDisplay = document.querySelector(".forecastDisplay");
    forecastDisplay.innerHTML = '';
    dailyForecast.forEach((day, idx) => {
        if (idx < 7) {
            let daysForecastContainer = `<div class="row d-flex flex-nowrap justify-content-end align-items-center m-2 border rounded-4">`;
            let forecastDay = `<div class="col"><h5>${formatDate(day.dt)}</h5></div>`;
            let forecastImgElement = `<div class="col"><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" width="50px" /></div>`;
            let minTemp = `<div class="col"><h6 class="text-danger">${formatTemp(day.temp.min)}</h6></div>`
            let line = `<div class="col"><hr></div>`
            let maxTemp = `<div class="col"><h6 class="text-success">${formatTemp(day.temp.max)}</h6></div>`
            daysForecastContainer = 
                daysForecastContainer + 
                    forecastDay + 
                    forecastImgElement + 
                    minTemp + 
                    line + 
                    maxTemp + 
                    `</div>`;
            forecastDisplay.innerHTML += daysForecastContainer;
        }
    })
}

let searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', getCityWeather); // Add handleSubmit function as listener to submit event on form

let currLocation = document.querySelector('#currLocation');
currLocation.addEventListener('click', getCurrentLocation);
