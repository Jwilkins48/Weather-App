const container = document.getElementById('container');
const switchBtn = document.getElementById('switch');
const input = document.getElementById('search');
const searchBtn = document.getElementById('hidden');
let isFahrenheit = true;

//Create Display
const displayInfo = (name, country, temp, minTemp, maxTemp, feelsLike, wind, description, icon) => {
    container.innerHTML = `
    <div id='topInfo'>
        <div id='cityNameContainer'>
            <h1> ${name} ${country}  </h1>
            <h2> ${Math.round(temp)}° <span class='degrees'>F</span></h2>
        </div>
        <div id='sideInfo'>
            <p class='max'> High ${Math.round(maxTemp)}° <span class='degrees'>F</span> </p>
            <p class='min'> Low ${Math.round(minTemp)}° <span class='degrees'>F</span> </p>
            <p class='feelsLike'> Feels like ${Math.round(feelsLike)}° <span class='degrees'>F</span> </p>
            <p class='windSpeed'>Wind Speed ${Math.round(wind)} mph</p>
        </div>
    </div><hr class='hr'>
    <div id='bottomSection'>
        <h1> ${description} <img src='${icon}' width='65px' height='65px'</h1>
    </div>
    <button id='switch'>F°/C°</button>`;
}

const clearWeather = () => {
    document.body.style.backgroundImage = 'url("imgs/sunnyFlowers.jpg")';
    container.style.backgroundColor = '#aaebb2'
    input.style.backgroundColor = '#aaebb2'
    input.style.color = '#323b42'
    container.style.color = '#323b42'

}
const rainyWeather = () => {
    document.body.style.backgroundImage = 'url("imgs/rainStopper.jpg")';
    container.style.backgroundColor = '#323b42'
    container.style.color = '#fff'
    input.style.color = '#fff'
    input.style.backgroundColor = '#323b42'
}
const thunderstormWeather = () => {
    document.body.style.backgroundImage = 'url("imgs/thunder.jpg")';
    container.style.backgroundColor = '#323b42'
    container.style.color = '#fff'
    input.style.color = '#fff'
    input.style.backgroundColor = '#323b42'
}
const snowWeather = () => {
    document.body.style.backgroundImage = 'url("imgs/snowing.jpg")';
    container.style.backgroundColor = '#276a9e'
    input.style.backgroundColor = '#559ed6'
    input.style.color = '#323b42'
    container.style.color = '#fff'
}


//Default Display
async function getWeather() {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=b4b8e0a986a6f49c7ff3c732748e9a3a&units=imperial', {
        mode: 'cors'
    });
    const weatherData = await res.json();
    console.log(weatherData);

    if (weatherData.weather[0].main === 'Clear') {
        clearWeather();
    } else if (weatherData.weather[0].main === 'Rain') {
        rainyWeather();
    } else if (weatherData.weather[0].main === 'Thunderstorm') {
        thunderstormWeather();
    } else if (weatherData.weather[0].main === 'Snow') {
        snowWeather();
    }

    let weatherIcon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    displayInfo(weatherData.name, weatherData.sys.country, weatherData.main.temp, weatherData.main.temp_min,
        weatherData.main.temp_max, weatherData.main.feels_like, weatherData.wind.speed, weatherData.weather[0].description, weatherIcon)
}
getWeather();

//Searched Location
async function searchLocation() {
    let location = input.value;
    input.value = '';

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b4b8e0a986a6f49c7ff3c732748e9a3a&units=imperial`, {
        mode: 'cors'
    });
    const weatherData = await res.json();
    console.log(weatherData);

    if (weatherData.weather[0].main === 'Clear') {
        clearWeather();
    } else if (weatherData.weather[0].main === 'Rain') {
        rainyWeather();
    } else if (weatherData.weather[0].main === 'Thunderstorm') {
        thunderstormWeather();
    }

    let weatherIcon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    displayInfo(weatherData.name, weatherData.sys.country, weatherData.main.temp, weatherData.main.temp_min,
        weatherData.main.temp_max, weatherData.main.feels_like, weatherData.wind.speed, weatherData.weather[0].description, weatherIcon)

}

input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchBtn.click();
    }
})
searchBtn.addEventListener('click', searchLocation);

//change Background