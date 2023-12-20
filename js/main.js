import { infoForRequest, coordinates, getWeather,  getCoordinates, getForecast } from './weatherInfo.js'
import { constants, getFormattedTime } from './constants.js'

constants.inputField.addEventListener('submit', renderWeather);
constants.cityList.addEventListener('click', renderWeather);
constants.cityList.addEventListener('click', removeFavoriteCity);
constants.heart.addEventListener('click', toggleHeart);

const favorites = ['Tokyo', 'Sapporo', 'Taipei'];

function toggleHeart() {
    const isInFavorites = favorites.includes(constants.cityName.textContent);
    if(!isInFavorites) {
        if(favorites.length === 5 ) { 
            favorites.splice(favorites.length - 1, 1) 
        } 
        favorites.unshift(constants.cityName.textContent)
        constants.heart.setAttribute('fill', 'black');
        renderArrayFavorites() 
    } 
    else {
        const index = favorites.indexOf(constants.cityName.textContent, 0);
        favorites.splice(index, 1)
        constants.heart.setAttribute('fill', 'none');
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
    const cities = Array.from(document.querySelectorAll('.city-list li'));
    cities.forEach((city) => city.remove())
    favorites.forEach(city => {
        const cross = document.createElement('span');
        const paragraph = document.createElement('p');
        const listItem = document.createElement('li');

        cross.classList.add('removing-cross');
        paragraph.textContent = city;
        listItem.appendChild(cross);
        listItem.appendChild(paragraph);
        constants.cityList.appendChild(listItem);
    })
}

function substituteValues() {
    getWeather().then(data => {
        console.log(data)
        constants.weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        constants.input.setAttribute('placeholder', `${data.name}`);
        constants.cityName.textContent = `${data.name}`;
        constants.cityTemperature.textContent = `${Math.round(data.main.temp)}°`;
        constants.currentFeelsLike.textContent =`Feels like: ${Math.round(data.main.feels_like)}°`;

        const timezone = data.timezone;
        const sunriseTimestamp = data.sys.sunrise;
        const sunsetTimestamp = data.sys.sunset;

        constants.sunrise.textContent = `Sunrise: ${getFormattedTime(sunriseTimestamp, timezone)}`;
        constants.sunset.textContent = `Sunset: ${getFormattedTime(sunsetTimestamp, timezone)}`;

        if(!favorites.includes(data.name)) {
            constants.heart.setAttribute('fill', 'none');
        } else {
            constants.heart.setAttribute('fill', 'black');
        }
    }).finally(constants.input.value = '')

    getCoordinates().then(data => {
        coordinates.latitude = data[0].lat;
        coordinates.longitude = data[0].lon;
        // console.log(coordinates.latitude)
        // console.log(coordinates.longitude)
        getForecast().then(data => {
            console.log(data);
            const timezone = data.city.timezone;
            const firstPeriodTimestamp = data.list[0].dt;
            const secondPeriodTimestamp = data.list[1].dt;
            const thirdPeriodTimestamp = data.list[2].dt

            constants.firstPeriod.textContent = getFormattedTime(firstPeriodTimestamp, timezone);
            constants.firstPeriodTemperature.textContent = `Temperature: ${Math.round(data.list[0].main.temp)}°`;
            constants.firstPeriodFeelsLike.textContent = `Feels like: ${Math.round(data.list[0].main.feels_like)}°`;
            constants.firstPeriodImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);

            constants.secondPeriod.textContent = getFormattedTime(secondPeriodTimestamp, timezone);
            constants.secondPeriodTemperature.textContent = `Temperature: ${Math.round(data.list[1].main.temp)}°`;
            constants.secondPeriodFeelsLike.textContent = `Feels like: ${Math.round(data.list[1].main.feels_like)}°`;
            constants.secondPeriodImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`);

            constants.thirdPeriod.textContent = getFormattedTime(thirdPeriodTimestamp, timezone);
            constants.thirdPeriodTemperature.textContent = `Temperature: ${Math.round(data.list[2].main.temp)}°`;
            constants.thirdPeriodFeelsLike.textContent = `Feels like: ${Math.round(data.list[2].main.feels_like)}°`;
            constants.thirdPeriodImg.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`);
        })  
    }) 
}

function renderWeather(event) {
    let nameForRequest;
    if(event.type === 'submit') {
        event.preventDefault()
        nameForRequest = constants.input.value;
    }

    if((event.target.tagName === 'P')) {
        nameForRequest = event.target.textContent;
    }

    if(nameForRequest !== undefined) {
        nameForRequest = nameForRequest.trim().toLowerCase();
        nameForRequest = nameForRequest[0].toUpperCase() + nameForRequest.slice(1, nameForRequest.length);
        infoForRequest.city = nameForRequest;
    }
    substituteValues()
}

renderArrayFavorites()
substituteValues()