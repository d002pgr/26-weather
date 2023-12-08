import { infoForRequest, getWeather } from './weatherInfo.js'
import { inputField, input, cityList, cityTemperature, heart } from './constants.js';

inputField.addEventListener('submit', renderWeather);
cityList.addEventListener('click', renderWeather);
cityList.addEventListener('click', removeFavoriteCity);
heart.addEventListener('click', toggleHeart);

const favorites = ['Tokyo', 'Sapporo', 'Taipei'];

function toggleHeart() {
    const cityName = document.querySelector('.name-bar p');
    const isInFavorites = favorites.includes(cityName.textContent);
    if(!isInFavorites) {
        if(favorites.length === 5 ) { 
            favorites.splice(favorites.length - 1, 1) 
        } 
        favorites.unshift(cityName.textContent)
        heart.setAttribute('fill', 'black');
        renderArrayFavorites() 
    } 
    else {
        const index = favorites.indexOf(cityName.textContent, 0);
        favorites.splice(index, 1)
        heart.setAttribute('fill', 'none');
        renderArrayFavorites()
    } 
}

function removeFavoriteCity(event) {
    if(event.target.tagName === 'SPAN') {
        const city = event.target.nextSibling.textContent;
        const index = favorites.indexOf(city, 0);
        favorites.splice(index, 1)
        renderArrayFavorites()
    }
}

function renderArrayFavorites() {
    const cities = Array.from(document.querySelectorAll('li'));
    cities.forEach((city) => city.remove())
    favorites.forEach(city => {
        const cross = document.createElement('span');
        const paragraph = document.createElement('p');
        const listItem = document.createElement('li');
        cross.classList.add('removing-cross');
        paragraph.textContent = city;
        listItem.appendChild(cross);
        listItem.appendChild(paragraph);
        cityList.appendChild(listItem);
    })
}

function substituteValues() {
    getWeather().then(data => {
        const weatherIcon = document.querySelector('.weather-icon');
        const cityName = document.querySelector('.name-bar p');
        const temperature = Math.round(data.main.temp);
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
        input.setAttribute('placeholder', `${data.name}`);
        cityName.textContent = `${data.name}`;
        cityTemperature.textContent = `${temperature}°`;
        if(!favorites.includes(data.name)) {
            heart.setAttribute('fill', 'none');
        } else {
            heart.setAttribute('fill', 'black');
        }
    }).finally(input.value = '')
}

function renderWeather(event) {
    let nameForRequest;
    if(event.type === 'submit') {
        event.preventDefault()
        nameForRequest = input.value;
    }

    if((event.target.tagName === 'P')) {
        nameForRequest = event.target.textContent;
    }

    if(nameForRequest !== undefined) {
        nameForRequest = nameForRequest.trim().toLowerCase()
        nameForRequest = nameForRequest[0].toUpperCase() + nameForRequest.slice(1, nameForRequest.length);
        infoForRequest.city = nameForRequest;
    }
    substituteValues()
}

renderArrayFavorites()
substituteValues()