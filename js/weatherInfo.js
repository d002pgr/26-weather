export {infoForRequest, getWeather}

const infoForRequest = {
    'serverUrl': 'https://api.openweathermap.org/data/2.5/weather',
    'city': 'boston',
    'apiKey': '4fb30dcd8eb80d796c79e4ba22d7b907'
};

function getWeather() {
    const url = `${infoForRequest.serverUrl}?q=${infoForRequest.city}&appid=${infoForRequest.apiKey}&units=metric`;
    return fetch(url).then(response => response.json())
}




