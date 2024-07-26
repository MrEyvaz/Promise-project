const cityInput = document.querySelector('.text')
const btn = document.querySelector('.btn')
const forecastContainer = document.querySelector('.forecast-container')

const api_key = '727793ca47485e3e04b167dfda3caf48'

async function fetchApi(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}`);
        const data = await response.json()
        console.log(data);
        displayForecastData(cityName, data)
    } catch (error) {
        console.log(error);
    }
}

function cityData() {
    const cityName = cityInput.value
    fetchApi(cityName)
    cityInput.value = ''
}

function displayForecastData(cityName, data) {
    forecastContainer.innerHTML = ''
    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { 
            const forecastDate = new Date(forecast.dt_txt)
            const forecastDay = forecastDate.toLocaleDateString()
            const forecastTime = forecastDate.toLocaleTimeString()
            const iconCode = forecast.weather[0].icon
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            const temperature = Math.round(forecast.main.temp - 273.15)
            const humidity = forecast.main.humidity
            const windSpeed = forecast.wind.speed

            const forecastHTML = `
                <div class="forecast">
                    <h2>${forecastDay} ${forecastTime}</h2>
                    <img src="${iconUrl}" alt="Weather icon for ${cityName}">
                    <p style="font-size: 20px;">Temperature: ${temperature}°C</p>
                    <p style="font-size: 20px; margin-top: 10px;">Humidity: ${humidity}%</p>
                    <p style="font-size: 20px; margin-top: 10px;">Wind Speed: ${windSpeed} km/h</p>
                </div>
            `
            forecastContainer.insertAdjacentHTML('beforeend', forecastHTML)
        }
    })
}

btn.addEventListener('click', cityData)