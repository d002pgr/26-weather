import { infoForRequest } from "./weatherInfo.js"

export {saveFavoriteCities, saveCurrentCity, setSavedData,setSavedCurrentCity }

function saveFavoriteCities(arr) {
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
}

function saveCurrentCity(str) {
    localStorage.setItem('currentCity', str);
}

function setSavedData(arr) {
    if (JSON.parse(localStorage.getItem('favoriteCities')) !== null) {
    const cities = JSON.parse(localStorage.getItem('favoriteCities'));
    arr.splice(0, arr.length);
    cities.forEach(city => arr.push(city));
    }
}

function setSavedCurrentCity() {
    if(localStorage.getItem('currentCity') !== null) {
        infoForRequest.city = localStorage.getItem('currentCity');
    }
}