import {infoForRequest, getWeather} from './weatherInfo.js'
import { inputField, input, cityList, cityTemperature, cityName, toggleHeart } from './constants.js';


inputField.addEventListener('submit', renderWeather);
cityList.addEventListener('click', renderWeather);
toggleHeart.addEventListener('click', toggleFavorite);

const favorites = ['Amur', 'Samara', 'Bali', 'Antwerpen', 'Tokyo'];

function toggleFavorite() {
    const isInFavorites = favorites.includes(cityName.textContent, 0);

    if(!isInFavorites) {
        if(favorites.length === 5 ) { 
            favorites.splice(favorites.length - 1, 1) 
        } 
        favorites.unshift(cityName.textContent)
        toggleHeart.setAttribute('fill', 'black');
        renderArrayFavorites() 
    } else {
        const index = favorites.indexOf(cityName.textContent, 0);
        favorites.splice(index, 1)
        toggleHeart.setAttribute('fill', 'none');
        renderArrayFavorites()  
    } 
}

function renderArrayFavorites() {
    const cities = Array.from(document.querySelectorAll('li'));
    cities.forEach((city) => city.remove())
    favorites.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        cityList.appendChild(listItem)
    })
}

function renderWeather(event) {
        event.preventDefault()
        let nameForRequest = event.target.querySelector('input').value.toLowerCase().trim();
        nameForRequest = nameForRequest[0].toUpperCase() + nameForRequest.slice(1, nameForRequest.length);
        // Добавить функционал чтобы названия городов которые состоят из двух слов, при вводе их без тире, оно автоматически подставлялось 
        // и второе слово начиналось с заглавной.
        infoForRequest.city = nameForRequest;
        getWeather().then(data => {
            const temperature = Math.round(data.main.temp);
            const city = data.name;
            input.setAttribute('placeholder', `${city}`);
            cityTemperature.textContent = `${temperature}°`;
            cityName.textContent = `${city}`;
        })
    

    // if(event.type === 'click' & event.target === 'li') {
    //     console.log(event.target)
    // }

}