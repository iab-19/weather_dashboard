const APIKey = 'cb4f2678290f12a8cbfdfaa638ab9e93'; // API key
const submitButton = document.getElementById('submitButton'); // Submit button
const textBox = document.querySelector('#searchBar'); // Text box
const h2city = document.querySelector('#h2city');
const h3temp = document.querySelector('#h3temp');
const h3wind = document.querySelector('#h3wind');
const h3humidity = document.querySelector('#h3humidity');

// city = 'kuala lumpur';
// city = document.getElementById('searchBar');


function getCurrentWeather() {
    let city = textBox.value;
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    fetch(currentURL)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log(data);
        let location = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        console.log(location);
        console.log(`Temperature: ${temperature}℉`);
        console.log(`Weather Description: ${weatherDescription}`);
        console.log(`Wind Speed: ${windSpeed} miles/hour`);
        console.log(`Humidity: ${humidity}%`);

        const nameNode = document.createTextNode(`Location: ${location}, ${weatherDescription}`);
        h2city.innerHTML = '';
        h2city.appendChild(nameNode);

        const tempNode = document.createTextNode(`Temperature: ${temperature}℉`);
        h3temp.innerHTML = '';
        h3temp.appendChild(tempNode);

        const windNode = document.createTextNode(`Wind Speed: ${windSpeed} miles/hour`);
        h3wind.innerHTML = '';
        h3wind.appendChild(windNode);

        const humNode = document.createTextNode(`Humidity: ${humidity}%`);
        h3humidity.innerHTML = '';
        h3humidity.appendChild(humNode);
    })
    .catch(err => alert("Wrong city name"));
}



submitButton.addEventListener('click', getCurrentWeather);
// console.log(data.weather.main)
// console.log(city);
