// creating variables for HTML elements
const searchbarInput = document.querySelector('#searchbar-input');
const searchButton = document.querySelector('#search-button');

const currentCityNameAndDate = document.querySelector('#city-name-and-date');
const currentCityTemp = document.querySelector('#city-temp');
const currentCityWind = document.querySelector('#city-wind');
const currentCityHumidity = document.querySelector('#city-humidity');
const currentCityUVIndex = document.querySelector('#city-UV-index');




// IF YOU CAN'T ADD THE DATE OF THE CURRENT CITY EASILY WITHOUT PAYING ANY MONEY, THEN DON'T WORRY ABOUT IT, IT'S NOT WORTH THE HASSLE.

searchButton.addEventListener('click', function(e) {
    // prevent reloading of the page
    e.preventDefault();

    // capture the value that was written in the searchbar
    let cityName = searchbarInput.value;
    
    // based off that value, use fetch request to get the relevant data about the city from the OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4351b60861d031e4e28b9b53af65fc5d`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentCityNameAndDate.textContent = `${data.name}`
    })
})

