const APIKey = 'cb4f2678290f12a8cbfdfaa638ab9e93'; // API key
const submitButton = document.getElementById('submitButton'); // Select the submit button
const textBox = document.querySelector('#searchBar'); // Select the text box
const currentCity = document.querySelector('#city'); // Select the city
const currentTemp = document.querySelector('#currentTemp'); // Select the temperature
const currentWind = document.querySelector('#currentWind'); // Select the wind speed
const currentHumidity = document.querySelector('#currentHumidity'); // Select the humidity
const ulSelector = document.querySelector('#cityButton'); // Select the button to show the weather conditions for
const fiveDay = document.querySelector('.forecast5day'); // Select the 5 day forecase section

// Select the temperature for days 1 to 5
const day1tempSelector = document.querySelector('#day1temp');
const day2tempSelector = document.querySelector('#day2temp');
const day3tempSelector = document.querySelector('#day3temp');
const day4tempSelector = document.querySelector('#day4temp');
const day5tempSelector = document.querySelector('#day5temp');

// Select the wind for days 1 to 5
const day1windSelector = document.querySelector('#day1wind');
const day2windSelector = document.querySelector('#day2wind');
const day3windSelector = document.querySelector('#day3wind');
const day4windSelector = document.querySelector('#day4wind');
const day5windSelector = document.querySelector('#day5wind');

// Select the humidity for days 1 to 5
const day1humiditySelector = document.querySelector('#day1humidity');
const day2humiditySelector = document.querySelector('#day2humidity');
const day3humiditySelector = document.querySelector('#day3humidity');
const day4humiditySelector = document.querySelector('#day4humidity');
const day5humiditySelector = document.querySelector('#day5humidity');

var cityArray = JSON.parse(localStorage.getItem('cityArray')) || [];
for (var i = 0; i< cityArray.length; i++) {
    let li = document.createElement('li');
        let button = document.createElement('button');
        button.textContent = cityArray[i];
        button.onclick = searchHistoryTrigger;
        li.append(button);
        ulSelector.append(li);
}

function searchHistoryTrigger() {
    console.log(this.textContent);
    fetchData(this.textContent)
}


async function fetchData(city) {

    let currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;

    try {
        // Current Weather
        const response = await fetch(currentURL);
        const data = await response.json();
        console.log(data);
        // local storage process
        if (!cityArray.includes(data.name)) {
            cityArray.push(data.name);
            localStorage.setItem('cityArray', JSON.stringify(cityArray));
            let li = document.createElement('li');
            let button = document.createElement('button');
            button.textContent = data.name;
            button.onclick = searchHistoryTrigger;
            li.append(button);
            ulSelector.append(li);
        }
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        let location = data.name;
        console.log(location);
        console.log(`Temperature: ${temperature}℉`);
        console.log(`Weather Description: ${weatherDescription}`);
        console.log(`Wind Speed: ${windSpeed} miles/hour`);
        console.log(`Humidity: ${humidity}%`);
        let lon = data.coord.lon;
        let lat = data.coord.lat;

        currentCity.innerHTML = `Location: ${location}, ${weatherDescription}`;

        // const tempNode = document.createTextNode(`Temperature: ${temperature}℉`);
        currentTemp.innerHTML = `Temperature: ${temperature}℉`;
        // currentTemp.appendChild(tempNode);

        // const windNode = document.createTextNode(`Wind Speed: ${windSpeed} miles/hour`);
        currentWind.innerHTML = `Wind Speed: ${windSpeed} miles/hour`;
        // currentWind.appendChild(windNode);

        // const humNode = document.createTextNode(`Humidity: ${humidity}%`);
        currentHumidity.innerHTML = `Humidity: ${humidity}%`;
        // currentHumidity.appendChild(humNode);

        // 5 Day weather
        const nestedResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`);
        const nestedData = await nestedResponse.json();

        // Day 1
        const day1temp = nestedData.list[9].main.temp;
        const day1wind = nestedData.list[9].wind.speed;
        const day1humidity = nestedData.list[9].main.humidity;
        day1tempSelector.innerHTML = `Temp: ${day1temp}℉`;
        day1windSelector.innerHTML = `Wind: ${day1wind}mph`;
        day1humiditySelector.innerHTML = `Humidity: ${day1humidity}%`;

        // Day 2
        const day2temp = nestedData.list[17].main.temp;
        const day2wind = nestedData.list[17].wind.speed;
        const day2humidity = nestedData.list[17].main.humidity;
        day2tempSelector.innerHTML = `Temp: ${day2temp}℉`;
        day2windSelector.innerHTML = `Wind: ${day2wind}mph`;
        day2humiditySelector.innerHTML = `Humidity: ${day2humidity}%`;

        // Day 3
        const day3temp = nestedData.list[25].main.temp;
        const day3wind = nestedData.list[25].wind.speed;
        const day3humidity = nestedData.list[25].main.humidity;
        day3tempSelector.innerHTML = `Temp: ${day3temp}℉`;
        day3windSelector.innerHTML = `Wind: ${day3wind}mph`;
        day3humiditySelector.innerHTML = `Humidity: ${day3humidity}%`;

        // Day 4
        const day4temp = nestedData.list[33].main.temp;
        const day4wind = nestedData.list[33].wind.speed;
        const day4humidity = nestedData.list[33].main.humidity;
        day4tempSelector.innerHTML = `Temp: ${day4temp}℉`;
        day4windSelector.innerHTML = `Wind: ${day4wind}mph`;
        day4humiditySelector.innerHTML = `Humidity: ${day4humidity}%`;

        // Day 5
        const day5temp = nestedData.list[39].main.temp;
        const day5wind = nestedData.list[39].wind.speed;
        const day5humidity = nestedData.list[39].main.humidity;
        day5tempSelector.innerHTML = `Temp: ${day5temp}℉`;
        day5windSelector.innerHTML = `Wind: ${day5wind} mph`;
        day5humiditySelector.innerHTML = `Humidity: ${day5humidity}%`;

        console.log(nestedData);
        fiveDay.classList.remove('hide');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

submitButton.addEventListener('click', function() {
    let city = textBox.value;
    fetchData(city);
});
