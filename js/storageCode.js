import { infoForRequest } from "./weatherInfo.js"

export {saveFavoriteCities, saveCurrentCity, setSavedData }

function saveFavoriteCities(arr) {
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
    console.log(localStorage)
}

function saveCurrentCity(str) {
    localStorage.setItem('currentCity', str);
}

function setSavedData(arr) {
    const cities = JSON.parse(localStorage.getItem('favoriteCities'));
    arr.splice(0, arr.length);
    cities.forEach(city => arr.push(city));
    infoForRequest.city = localStorage.getItem('currentCity');
}

