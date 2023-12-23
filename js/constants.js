export { constants, getFormattedTime }

const constants = { 
    inputField: document.querySelector('.input-field'),
    input: document.querySelector('input'),

    cityName: document.querySelector('.name-bar p'), 
    cityList: document.querySelector('.city-list'),
    cityTemperature: document.querySelector('h1'),

    weatherIcon: document.querySelector('.weather-icon'),
    heart: document.querySelector('.name-bar svg'),

    currentFeelsLike: document.querySelector('.current-feels-like'),
    sunrise: document.querySelector('.sunrise'),
    sunset: document.querySelector('.sunset'),

    firstPeriod: document.querySelector('.first-period'),
    firstPeriodTemperature: document.querySelector('.first-period-temperature'),
    firstPeriodFeelsLike: document.querySelector('.first-period-feels-like'),
    firstPeriodImg: document.querySelector('.first-period-img'),

    secondPeriod: document.querySelector('.second-period'),
    secondPeriodTemperature: document.querySelector('.second-period-temperature'),
    secondPeriodFeelsLike: document.querySelector('.second-period-feels-like'),
    secondPeriodImg: document.querySelector('.second-period-img'),

    thirdPeriod: document.querySelector('.third-period'),
    thirdPeriodTemperature: document.querySelector('.third-period-temperature'),
    thirdPeriodFeelsLike: document.querySelector('.third-period-feels-like'),
    thirdPeriodImg: document.querySelector('.third-period-img')
}

function getFormattedTime(timestamp, timezone) {
    const myDateNow = new Date();
    const myTimeOffset = myDateNow.getTimezoneOffset() * 60 * 1000;
    const date = new Date(timestamp * 1000 + myTimeOffset + timezone * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}