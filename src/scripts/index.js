import { weatherKey, gifKey } from '../../apikeys.js';

// fetch weather data for current location using Promises 
const fetchWeather = (location) => {

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherKey}&units=metric`

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
    })

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

    fetchWeather(location).then(data => {
        displayData(data);
        console.log(data['weather']);
        fetchGif(`weather ${data['weather']}`);
    // TODO: handle error
    }).catch(err => {
        let detail = document.createElement('li');
        detail.textContent = 'Woops! Looks like something went wrong...';
        details.append(detail);
        img.style.display = 'none';
    })
    

    search.reset();

});

// fetch gif based on weather data using async + await
const img = document.querySelector('img');

const fetchGif = async (keyword) => {

    let data = `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}=${keyword}`;

    const response = await fetch(data, { mode: 'cors' });
    const json = await response.json();
    img.style.display = 'block';
    img.src = json.data.images.original.url;

}

// add loading animation
// const loader = document.querySelector('.loader');
// loader.classList.toggle('none');

