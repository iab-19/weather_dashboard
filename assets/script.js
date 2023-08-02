const APIKey = 'cb4f2678290f12a8cbfdfaa638ab9e93';
var city;
city = 'London';
// city = document.getElementById('searchBar');
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;


fetch(queryURL)
    .then(response => response.json())
    .then(data => console.log(data))
.catch(err => alert("Wrong city name"))
