import apiKey from '../../apikey.js';

// fetch weather data for current location using Promises 
const fetchWeather = (location) => {

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

    return fetch(api, { mode: 'cors' })
    .then(response => response.json())
    .then(json => {
        return {
            location: location,
            feels_like: json.main.feels_like,
            temp: json.main.temp,
            weather: json.weather[0].main,
            description: json.weather[0].description
        }
    });

}

// display weather data
const details = document.querySelector('ul');


const displayData = (data) => {

    if (details.childElementCount > 0) {
        details.replaceChildren();
    }

    for (let property in data) {

        let detail = document.createElement('li');
        detail.textContent = `${property}: ${data[property]}`;

        details.append(detail);

    }    

}

// search
const search = document.querySelector('form');

search.addEventListener('submit', (e) => {

    e.preventDefault();
    let location = search.elements['location'].value;

    fetchWeather(location).then(data => displayData(data));

    search.reset();

});

// TODO: fetch gif based on weather data using async + await

// TODO: add loading animation -> https://www.w3schools.com/howto/howto_css_loader.asp

