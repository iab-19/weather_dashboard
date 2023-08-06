const APIKey = 'cb4f2678290f12a8cbfdfaa638ab9e93'; // API key
const submitButton = document.getElementById('submitButton'); // Submit button
const textBox = document.getElementById('searchBar'); // Text box
var city;
city = 'clarksburg';
// city = document.getElementById('searchBar');
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
console.log(queryURL);

// function getURL() {
    fetch(queryURL)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        console.log(`Temperature: ${temperature}F`);
        console.log(`Weather Description: ${weatherDescription}`);
    })
    .catch(err => alert("Wrong city name"))
    console.log(queryURL);
// }

// submitButton.addEventListener('click', getURL);
// console.log(data.weather.main)
