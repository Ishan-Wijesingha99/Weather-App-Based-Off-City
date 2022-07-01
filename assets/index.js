// creating variables for HTML elements
const searchbarInput = document.querySelector('#searchbar-input');
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('.search-form');

const forecastBlockNodeList = document.querySelectorAll('.forecast-block');
const blockDatesNodeList = document.querySelectorAll('.block-date');
const blockTempNodeList = document.querySelectorAll('.block-temp');
const blockWindNodeList = document.querySelectorAll('.block-wind');
const blockHumidityNodeList = document.querySelectorAll('.block-humidity');
const blockImgNodeList = document.querySelectorAll('.block-img');



const currentCityNameAndDate = document.querySelector('#city-name-and-date');
const currentCityImg = document.querySelector('#city-img');
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


        // create a HTML element based off what was searched
        searchForm.insertAdjacentHTML('afterend', 
        `<div class="recent-search-element">${cityName}</div>`
        )









        // get the date of the current city and display it on the webpage
        let cityTime = new Date((new Date().getTime()) + 1000*data.timezone).toUTCString();

        let words = cityTime.split(' ')

        currentCityNameAndDate.textContent = `${data.name} (${words[1]} ${words[2]} ${words[3]})`

        currentCityImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        currentCityTemp.textContent = `Temp: ${(data.main.temp - 273.15).toFixed(2)}°C`

        currentCityWind.textContent = `Wind: ${data.wind.speed} MPH`

        currentCityHumidity.textContent = `Humidity: ${data.main.humidity}%`

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=4351b60861d031e4e28b9b53af65fc5d`)


    }).then(response => response.json())
    .then(data2 => {
        console.log(data2)

        currentCityUVIndex.textContent = `UV Index: ${data2.current.uvi}`


        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data2.lat}&lon=${data2.lon}&appid=4351b60861d031e4e28b9b53af65fc5d`)
    }).then(response => response.json())
    .then(data3 => {
        
        console.log(data3);

        blockDatesNodeList.forEach(function(element) {
            let dateAndTime = data3.list[element.dataset.set].dt_txt;
            let dateAndTimeArray = dateAndTime.split(' ');
            console.log(dateAndTimeArray);
            element.textContent = `${dateAndTimeArray[0]}`
            element.style.textDecoration = 'underline';
        })

        blockImgNodeList.forEach(function(element) {
            element.src = `http://openweathermap.org/img/wn/${data3.list[element.dataset.set].weather[0].icon}@2x.png`
        })

        blockTempNodeList.forEach(function(element) {
            element.textContent = `Temp: ${(data3.list[element.dataset.set].main.temp - 273.15).toFixed(2)}°C`
        })

        blockWindNodeList.forEach(function(element) {
            element.textContent = `Wind: ${(data3.list[element.dataset.set].wind.speed).toFixed(2)} MPH`
        })

        blockHumidityNodeList.forEach(function(element) {
            element.textContent = `Humidity: ${(data3.list[element.dataset.set].main.humidity).toFixed(2)}%`
        })





    })







})

