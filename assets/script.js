const APIKey = 'cb4f2678290f12a8cbfdfaa638ab9e93';
var city;
city = 'London';
// city = document.getElementById('searchBar');
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

var data = fetch(queryURL);
console.log(data);
fetch(queryURL);
