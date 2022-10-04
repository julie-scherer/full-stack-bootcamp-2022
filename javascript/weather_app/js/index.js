console.log('Hello checking that we are connected!');

getCurrLocForecast();

let searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', getCityForecast); // Add handleSubmit function as listener to submit event on form

let currLocBut = document.querySelector('#currLocBut');
currLocBut.addEventListener('click', getCurrLocForecast);

function getCurrLocForecast() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            let weatherData = await weatherRes.json();
            let forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            let forecastData = await forecastRes.json();
            displayWeather(weatherData);
            displayForecast(forecastData);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

async function getCityForecast(event) {
    event.preventDefault();
    let city = event.target.cityLookup.value;
    let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    let weatherData = await weatherRes.json();
    let forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    let forecastData = await forecastRes.json();
    displayWeather(weatherData);
    displayForecast(forecastData);
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
}

function displayForecast(data) {
    // console.log(data);
    // 5 day / 3 hour forecast data
    // 24 hours/day / 3-hour windows = 8 timestamps/day for 5 days

    let forecastDisplay = document.querySelector(".forecastDisplay");
    forecastDisplay.innerHTML = '';

    list = data.list;
    list.forEach((listDay, idx) => {
        if (idx == 0 | idx == 8 |  idx == 16 | idx == 24 | idx == 32) {
            let forecastDay = document.createElement('div');
            forecastDay.innerHTML = `<h1>${formatDate(listDay.dt)}</h1>`;
            forecastDisplay.append(forecastDay);
        }

        let forecastDayCont = document.createElement('div');
        forecastDayCont.className = 'col col-lg-1.5 col-md-2 col-sm-3 bg-opacity-50 bg-dark border border-light border-opacity-25 rounded-3 m-1';
        
        let forecastTime = document.createElement('h5');
        forecastTime.innerHTML = formatTime(listDay.dt);
        
        let forecastImgElement = document.createElement('div');
        let icon =  listDay.weather[0].icon;
        forecastImgElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="75px" />`;
        

        let dayTempElement = document.createElement('div');
        dayTempElement.className = 'row row-cols-lg-3 row-cols-md-1 d-flex justify-content-between align-items-center';
        
        let minTempElement = document.createElement('div');
        minTempElement.className = 'col text-danger';
        minTempElement.innerHTML = `<h6>${formatTemp(listDay.main.temp_min)}</h6>`;
        
        let currTempElement = document.createElement('div');
        currTempElement.className = 'col';
        currTempElement.innerHTML = `<h5>${formatTemp(listDay.main.temp)}</h5>`;
        
        let maxTempElement = document.createElement('div');
        maxTempElement.className = 'col text-success';
        maxTempElement.innerHTML = `<h6>${formatTemp(listDay.main.temp_max)}</h6>`;


        dayTempElement.append(minTempElement);
        dayTempElement.append(currTempElement);
        dayTempElement.append(maxTempElement);
        
        forecastDayCont.append(forecastTime);
        forecastDayCont.append(forecastImgElement);        
        forecastDayCont.append(dayTempElement);
        
        forecastDisplay.append(forecastDayCont);

        }
    )
        
    
}