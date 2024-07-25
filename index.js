const cityInput = document.querySelector('.text')

const btn = document.querySelector('.btn')

const empty_p = document.querySelector('.citytext')

const api_key = '727793ca47485e3e04b167dfda3caf48'

async function fetchApi(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`)
        const data = await response.json()
        console.log(data);
        displayCityData(cityName, data)
    } catch (error) {
        console.log(error);
    }
}

function cityData() {
    const cityName = cityInput.value
    fetchApi(cityName)
    cityInput.value = ''
}

function displayCityData(cityName, data) {
    empty_p.textContent = `Temprature in ${cityName}: ${data.main.temp}`
}

btn.addEventListener('click', cityData)