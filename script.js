class Weather {
    constructor(city){
    this.apiKey = "71017ea68b8f5f9edd1b822e51b9f50f";
    this.fetchWeather = function(city) {
        fetch (
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    }
    this.displayWeather =  function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
    }
    this.search =  function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}
};
class ForecastWeather {
     constructor(city) {
    this.apiKey = "71017ea68b8f5f9edd1b822e51b9f50f"
    this.fetchForecastWeather = function(city) {
        fetch (
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
        )
        .then((response) => response.json())
        .then((data) => {
            this.displayForecastWeather(this.checkForecastData(data), this.checkDay());
        });
    }
    this.displayForecastWeather =  function(dataArray, days) {
        const forecastElement = document.querySelector('.list');
        let displayForecast = [];
        const displayForWeather = this.displayForWeather(dataArray);
        const displayWeekday = this.displayWeekday(days);
        for(let i = 0; i < 4; i++){
            displayForecast[i] = displayWeekday[i] + displayForWeather[i];
        };
        displayForecast = displayForecast.join("");
        forecastElement.innerHTML = displayForecast;
    }
    this.search =  function () {
        this.fetchForecastWeather(document.querySelector(".search-bar").value);
    }
}
displayForWeather(dataArray) {
    const displayForWeather = dataArray.map(function(object) {
        const { icon } = object.weather[0];
        const { description }  = object.weather[0];
        const  { temp } = object.main;
        return ` <div class="weather-forecast forecast">
        <img class="forecast__icon" src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">
        <div class="forecast__description">${description}</div>
        <h2 class="forecast__temp"> ${temp}°C</h2>
        </div>
        </div>`;
    });
    return displayForWeather;
}
displayWeekday(days) {
    const displayWeekday = days.map(function(day) {
        return `<div class="forecast-box">
        <div class="forecast__day">${day}</div>`
    });
    return displayWeekday;
}
checkForecastData(data) {
    const dataArray =[];
    for(let i=1; i < 5; i++){
        dataArray.push(data.list[8*i]);
    };
    return dataArray;
}
checkDay() {
    const date = new Date();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let d = date.getDay();
    const days = [];
    for (let i=0; i < 4; i++){
        d++;
    if (d > 6) {
        days.push(weekday[d - 7]);
    } else {
        days.push(weekday[d]);
    }
    }
    return days;
}
}
const city = "Bratislava";

const currentWeather = new Weather(city);
currentWeather.fetchWeather(city);
const currentForecastWeather = new ForecastWeather(city);
currentForecastWeather.fetchForecastWeather(city);

document.querySelector(".button").addEventListener("click", function() {
    currentWeather.search();
    currentForecastWeather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        currentWeather.search();
        currentForecastWeather.search();
    }
});
