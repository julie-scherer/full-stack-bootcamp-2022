console.log('Hello checking that we are connected!');
// console.dir(document);


// Get HTML Form
let form = document.querySelector('#searchForm');

async function handleSubmit(event){
    event.preventDefault(); 
    let inputCity = event.target.cityLookup.value;
    let city = await getWeatherInfo(inputCity); // Call the get country info function with the data from the form
    // console.log(city);
    buildWeatherCards(city);
}

async function getWeatherInfo(city){
    const apiKey = weather_api_key;
    let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`);
    let data = await res.json()
    // console.log(data);
    return data;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Build Weather Display Section

// Get Bootstrap Container
let container = document.querySelector('.container');

// Get Weather Container
let weatherContainer = document.querySelector('.weatherDisplay');   // let weatherContainer = document.createElement('div');
weatherContainer.className = 'd-flex flex-column align-content-center w-75 m-auto mb-5';
// console.log(weatherContainer);

function buildWeatherCards(cityWeatherObj) {

    // Create header to display city
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    let weatherContainerHead = document.createElement('h3');
    weatherContainerHead.className = 'text-center p-3';
    weatherContainerHead.style = 'text-decoration: underline;';     // style="text-decoration: underline;"
    weatherContainerHead.innerHTML = `${cityWeatherObj.name}`;

    // Create row to store card columns
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    let cardRow = document.createElement('div');
    cardRow.className = 'row row-cols-1 row-cols-md-2 g-4';
    

    
    // Create cards using Weather API data  
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    titles = ["Current Temperature", "Today's High and Low", "What It Feels Like", "Sunrise and Sunset"];

    function convertTemp(K) {
        return `${(((Number(K)-273.15)*1.8)+32).toFixed(1)}°F`;
    }
    
    function convertTime(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds
        // console.log(date.toLocaleTimeString("en-US"));
        return date.toLocaleTimeString("en-US");
    }

    fields = [`It is ${convertTemp(cityWeatherObj.main.temp)} with ${cityWeatherObj.weather[0].description}.`, 
                `The high today is ${convertTemp(cityWeatherObj.main.temp_max)} and the low is ${convertTemp(cityWeatherObj.main.temp_min)}.`, 
                `It feels like ${convertTemp(cityWeatherObj.main.feels_like)}.`,
                `The sunrise is at ${convertTime(cityWeatherObj.sys.sunrise)} and sunset is at ${convertTime(cityWeatherObj.sys.sunset)}.`];
           
    i = 0;
    while (i < 4) { 

        // Create column to store cards
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
        let cardCol = document.createElement('div');
        cardCol.className = 'col';
        
        // Create card to store card content
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
        let card = document.createElement('div');
        card.className = 'card';
        
        // Create card body (parent)
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
                    
        // Create card title & text (children)
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
        // card title
        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.innerHTML = titles[i];
        // card text
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerHTML = fields[i];
        // create array of siblings
        card_content = [cardTitle, cardText];

        // Build card elements
        // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
        // Add card title and text (children) to card body (parent)
        cardBody.append(...card_content);
        
        // Add card body (parent) to card (grandparent)
        card.append(cardBody);
        
        // Add card (grandparent) to card col (great grandparent)
        cardCol.append(card);
        
        // Add finished card column to the row of cards
        cardRow.append(cardCol);
        
        i++;
    }
    
    // Build out weather container
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
    // Add weather location header to weather container
    weatherContainer.innerHTML = '';
    weatherContainer.append(weatherContainerHead);
    
    // Add the row of cards to the weather container
    weatherContainer.append(cardRow)
}


// Add handleSubmit function as listener to submit event on form
form.addEventListener('submit', handleSubmit);
