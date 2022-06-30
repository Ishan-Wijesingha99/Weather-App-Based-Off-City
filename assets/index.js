// creating variables for HTML elements
const searchbarInput = document.querySelector('#searchbar-input');
const searchButton = document.querySelector('#search-button');

const currentCityNameAndDate = document.querySelector('#city-name-and-date');
const currentCityTemp = document.querySelector('#city-temp');
const currentCityWind = document.querySelector('#city-wind');
const currentCityHumidity = document.querySelector('#city-humidity');
const currentCityUVIndex = document.querySelector('#city-UV-index');



// const time = new Date();
// const UTCtime = time.toUTCString();
// const miliseconds = time.getTime();
// const newMiliseconds = miliseconds + 36000*1000;



// console.log(time)
// console.log(UTCtime)
// console.log(miliseconds);
// console.log(newMiliseconds);
// console.log(new Date(newMiliseconds).toUTCString())





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

        // get the date of the current city and display it on the webpage
        let cityTime = new Date((new Date().getTime()) + 1000*data.timezone).toUTCString();

        let words = cityTime.split(' ')

        currentCityNameAndDate.textContent = `${data.name} (${words[1]} ${words[2]} ${words[3]})`

        currentCityTemp.textContent = `Temp: ${data.main.temp}`

        currentCityWind.textContent = `Wind: ${data.wind.speed}`




    })
})

