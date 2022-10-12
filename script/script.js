const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=9c0f8877092343bd0bc2a5fc9c989028'

const form = document.querySelector('form')
const output = document.querySelector('.output')
const text_content = document.querySelector('#text_content')

const getWeather = async () => {
    const inp = document.querySelector('#inp')
    const url = API + inp.value + key
    const request = await fetch(url)
    const response = await request.json()
    // console.log(response);
    renderWeather(response)
    getMap(response.coord)
    inp.value = ''
}

const renderWeather = (data) => {
    console.log(data);
    text_content.innerHTML = ''
    const name = document.createElement('h1')
    name.textContent = 'City: ' + data.name
    const tempC = document.createElement('h2')
    tempC.textContent = 'Temp C: ' + Math.floor(data.main.temp - 273.15)
    const tempF = document.createElement('h2')
    tempF.textContent = 'Temp F: ' + Math.round(((data.main.temp - 273.15) * 1.8) + 32)
    const weather = document.createElement('h2')
    weather.textContent = 'Weather: ' + data.weather[0].main
    const description = document.createElement('h2')
    description.textContent = 'Description: ' + data.weather[0].description
    const country = document.createElement('h2')
    country.textContent = 'Country: ' + data.sys.country
    text_content.append(name, tempC, tempF, weather, description, country)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})

const getMap = ({ lat, lon }) => {
    let map = document.createElement('div')
    map.id = 'map'
    // map.style.width = '300px'
    // map.style.height = '300px'
    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    text_content.append(map)
}
