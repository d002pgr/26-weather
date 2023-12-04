import {infoForRequest, url} from './weatherInfo.js'

const inputField = document.querySelector('.input-field');
const toggleHeart = document.querySelector('.name-bar svg');
const favoriteCities = document.querySelector('ul');

inputField.addEventListener('submit', renderWeather);
toggleHeart.addEventListener('click', toggleFavorite);
favoriteCities.addEventListener('click', renderWeather)

const favorites = ['Amur', 'Samara', 'Bali', 'Antwerpen', 'Tokyo'];

function toggleFavorite() {
    const nameCity = document.querySelector('.name-bar p').textContent;
    const isInFavorites = favorites.includes(nameCity, 0);

    if(!isInFavorites) {
        if(favorites.length === 5 ) { 
            favorites.splice(favorites.length - 1, 1) 
        } 
        favorites.unshift(nameCity)
        toggleHeart.setAttribute('fill', 'black');
        renderArrayFavorites() 
    } else {
        const index = favorites.indexOf(nameCity, 0);
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
        favoriteCities.appendChild(listItem)
    })
}

function renderWeather(event) {
    const cityTemperature = document.querySelector('h1');
    const cityName = document.querySelector('.name-bar p');
    const input = document.querySelector('input');

    event.preventDefault();
    let nameForRequest = event.target.querySelector('input').value.toLowerCase().trim();
    nameForRequest = nameForRequest[0].toUpperCase() + nameForRequest.slice(1, nameForRequest.length);
    infoForRequest.city = nameForRequest;

    console.log(infoForRequest.city) // записана верная информация, console.log это подтверждает
                                     // свойство 'city' изменилось, но в fetch оно все равно идёт как 'boston' 

    fetch(url).then(response => response.json() // Вот fetch
    ).then(data => {
        const temperature = Math.round(data.main.temp);
        const city = data.name;
        input.value = '';
        input.setAttribute('placeholder', `${city}`);
        cityTemperature.textContent = `${temperature}°`;
        cityName.textContent = `${city}`;
    })
}