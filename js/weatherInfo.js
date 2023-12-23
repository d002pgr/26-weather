export { infoForRequest, coordinates, getWeather,  getCoordinates, getForecast }

const infoForRequest = {
    'serverUrl': 'https://api.openweathermap.org/data/2.5/weather',
    'city': 'boston',
    'apiKey': '4fb30dcd8eb80d796c79e4ba22d7b907'
};

const coordinates = {
    'latitude': null, 
    'longitude': null
}

function getWeather() {
    const url = `${infoForRequest.serverUrl}?q=${infoForRequest.city}&appid=${infoForRequest.apiKey}&units=metric`;
    return fetch(url).then(response => response.json())
}

function getCoordinates() {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${infoForRequest.city}&limit=1&appid=${infoForRequest.apiKey}`;
    return fetch(url).then(response => response.json());
}

function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${infoForRequest.apiKey}&units=metric`;
    return fetch(url).then(response =>  response.json())
}

