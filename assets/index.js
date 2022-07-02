// creating variables for HTML elements
const searchbarInput = document.querySelector('#searchbar-input');
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('.search-form');

let recentSearchResultsNodeList;

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





// creating a function that handles the fetch requests
const fetchFunction = function(cityNameInput) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=4351b60861d031e4e28b9b53af65fc5d`)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        // create a HTML element based off what was searched in the searchbar
        searchForm.insertAdjacentHTML('afterend', 
        `<div class="recent-search-element">${cityNameInput}</div>`
        )

        // add event listener to each of the recent search results so that they operate as buttons
        recentSearchResultsNodeList = document.querySelectorAll('.recent-search-element');

        recentSearchResultsNodeList.forEach(function(element) {

            element.addEventListener('click', function() {
                searchbarInput.value = element.textContent;
            })
    
        })

        // get the date of the current city and display it on the webpage
        let cityTime = new Date((new Date().getTime()) + 1000*data.timezone).toUTCString();

        let words = cityTime.split(' ')

        currentCityNameAndDate.textContent = `${data.name} (${words[1]} ${words[2]} ${words[3]})`

        // get the weather icon, the temp, the wind and the humidity of the current city and display it on the webpage
        currentCityImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        currentCityTemp.textContent = `Temp: ${(data.main.temp - 273.15).toFixed(2)}°C`

        currentCityWind.textContent = `Wind: ${data.wind.speed} MPH`

        currentCityHumidity.textContent = `Humidity: ${data.main.humidity}%`

        // to chain fetch requests, we must always return a promise
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=4351b60861d031e4e28b9b53af65fc5d`)

    }).then(response => response.json())
    .then(data2 => {

        console.log(data2)

        // display the UV index of the current city
        currentCityUVIndex.textContent = `UV Index: ${data2.current.uvi}`

        // Style the UV index element once the fetch request has been made for the UV index value
        currentCityUVIndex.style.padding = '3px';
        currentCityUVIndex.style.borderRadius = '5px'
        currentCityUVIndex.style.boxShadow = '0px 0px 4px 1px black'

        // based on the value of the UV index, change the background colour of the element
        // this data is based off the UV index given in the following link
        // https://www.aimatmelanoma.org/melanoma-101/prevention/what-is-ultraviolet-uv-radiation/
        if(data2.current.uvi < 3) {
            currentCityUVIndex.style.backgroundColor = 'green'
        } else if(data2.current.uvi >= 3 && data2.current.uvi < 6) {
            currentCityUVIndex.style.backgroundColor = 'rgb(215, 215, 73)'
        } else if(data2.current.uvi >= 6 && data2.current.uvi < 8) {
            currentCityUVIndex.style.backgroundColor = 'orange'
        } else if(data2.current.uvi >= 8) {
            currentCityUVIndex.style.backgroundColor = 'red'
        }

        // return a promise so that fetch requests can be chained
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data2.lat}&lon=${data2.lon}&appid=4351b60861d031e4e28b9b53af65fc5d`)

    }).then(response => response.json())
    .then(data3 => {
        
        console.log(data3);

        // loop through the block date elements to add a date to each of them
        blockDatesNodeList.forEach(function(element) {
            // get date from API data
            let dateAndTime = data3.list[element.dataset.set].dt_txt;
            let dateAndTimeArray = dateAndTime.split(' ');
            
            // display date on webpage
            element.textContent = `${dateAndTimeArray[0]}`;

            // add underline to date element
            element.style.textDecoration = 'underline';
        })

        // loop through the block images to add weather icon to each of them
        blockImgNodeList.forEach(function(element) {
            // add img source based of API data
            element.src = `http://openweathermap.org/img/wn/${data3.list[element.dataset.set].weather[0].icon}@2x.png`
        })

        // loop through the block temp elements to add temp value to each of them
        blockTempNodeList.forEach(function(element) {
            // add temp value based of API data
            element.textContent = `Temp: ${(data3.list[element.dataset.set].main.temp - 273.15).toFixed(2)}°C`
        })

        // loop through the block wind elements to add wind value to each of them
        blockWindNodeList.forEach(function(element) {
            // add wind value based of API data
            element.textContent = `Wind: ${(data3.list[element.dataset.set].wind.speed).toFixed(2)} MPH`
        })

        // loop through the block humidity elements to add humidity value to each of them
        blockHumidityNodeList.forEach(function(element) {
            // add humidity value based of API data
            element.textContent = `Humidity: ${(data3.list[element.dataset.set].main.humidity).toFixed(2)}%`
        })

    })

}





// add event listener to search button
searchButton.addEventListener('click', function(e) {
    // prevent reloading of the page
    e.preventDefault();

    // use fetchFunction to get data from API based off searchbar value the user typed in, and then display this data on the webpage 
    fetchFunction(searchbarInput.value);
})


