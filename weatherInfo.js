export {infoForRequest, url}

const infoForRequest = {
    'serverUrl': 'http://api.openweathermap.org/data/2.5/weather',
    'apiKey': '4fb30dcd8eb80d796c79e4ba22d7b907',
    'city': 'boston'
};

const url = `${infoForRequest.serverUrl}?q=${infoForRequest.city}&appid=${infoForRequest.apiKey}&units=metric`


