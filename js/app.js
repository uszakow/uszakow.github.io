//Początkowo zadaje koordynaty Warszawy, jeżeli nie uda się pobrać innych
let latitude = 52.2319581;
let longitude = 21.0067249;
let city = 'Warsaw';

const outOnDisplay = document.querySelector('#app');

//Pobieram koordynaty na podstawie IP
(async () => {
    try {
        //Pokazać spinner
        showLoading(true);

        let coordinatesFromIP = await fetch('https://extreme-ip-lookup.com/json/');
        coordinatesFromIP = await coordinatesFromIP.json();

        if (coordinatesFromIP.lat != undefined &&
            coordinatesFromIP.lon != undefined &&
            coordinatesFromIP.city != undefined) {
            latitude = coordinatesFromIP.lat;
            longitude = coordinatesFromIP.lon;
            city = coordinatesFromIP.city;
        }

        //Przetłumaczyć nazwę miejscowości z angielskiego na polski
        city = await translateCity(city, `en-pl`);

        manageWeather(latitude, longitude, city);
    }
    catch (error) {
        console.log(`Error IP!`);
        console.log(error);
        manageWeather(latitude, longitude, city);
    }
})();

//Dodaję w zmienne przycisk do wyświetlenia formy i samą formę, przy nacisku forma się wyswietli
const buttonAddCity = document.querySelector('#add-city');
const formForAddCity = document.querySelector('#app .module__form');
buttonAddCity.addEventListener('click', () => {
    formForAddCity.hidden = false;
})

//Przy wysyłaniu formy zwracać się do API GeoLocating, zapisać otrzymane koordynaty i nazwę miejscowości
formForAddCity.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        //Pokazać spinner
        showLoading(true);

        const cityRequest = document.querySelector('#search').value;

        //Otrzymać koordynaty miejscowości 
        let coordinatesFromRequest = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=8908a6c398994a29866bfb2eb127742d&q=${cityRequest}&language=pl`);
        coordinatesFromRequest = await coordinatesFromRequest.json();

        latitude = coordinatesFromRequest.results[0].geometry.lat;
        longitude = coordinatesFromRequest.results[0].geometry.lng;
        city = coordinatesFromRequest.results[0].formatted;
        city = city.split(', ')[0];
        if (city === undefined) {
            city = cityRequest;
        }

        manageWeather(latitude, longitude, city);
    }
    catch (error) {
        console.log(`Error Geolokation!`);
        console.log(error);
        manageWeather(latitude, longitude, city);
    }
})

//Funkcja na podstawie szerokości i długości geograficznej wysyła zapytanie do API Darksky
async function searchActualWeather(lat, lon) {
    try {
        let weather = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c7a3bfed7beb57e1e3d4d7eab3c41f60/${lat},${lon}?units=si&lang=pl`);
        weather = await weather.json();

        return weather;
    }
    catch (error) {
        console.log(`Error Weather!`);
        console.log(error);
    }
}

//Funkcja, która tłumaczy nazwy geograficzne
async function translateCity(city, langFromTo) {
    try {
        let translate = await fetch(`https://cors-anywhere.herokuapp.com/https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200301T175635Z.6d432b3748991025.eb3cb35fc54aedcc93aa7c0ce90970060a98fe88&text=${city}&lang=${langFromTo}`);
        translate = await translate.json();
        translate = translate.text[0];

        return translate;
    }
    catch (error) {
        console.log(`Error Translate!`);
        console.log(error);
        return city;
    }
}

//Funkcja dodaje blok z pogodą w danym miejscu
function showWeatherBlock(weather, city) {
    //Sklonować wzór
    const weatherOutWrap = document.querySelector('.module__weather').cloneNode(true);
    weatherOutWrap.hidden = false;
    formForAddCity.after(weatherOutWrap);

    // Obrazek z pogodą
    const weatherImage = weatherOutWrap.querySelector(`.weather__icon`);
    weatherImage.innerHTML = `<img src="images/icons/${weather.currently.icon}.svg"/>`;

    //Info z pogodą
    const weatherInfoCity = weatherOutWrap.querySelector('.city__name');
    weatherInfoCity.innerHTML = city;
    const weatherInfoTemperature = weatherOutWrap.querySelector('.temperature__value');
    weatherInfoTemperature.innerHTML = weather.currently.temperature.toFixed(1);

    //Pogoda szczegóły
    const weatherPressure = weatherOutWrap.querySelector('.pressure__value');
    weatherPressure.innerHTML = weather.currently.pressure;
    const weatherHumidity = weatherOutWrap.querySelector('.humidity__value');
    weatherHumidity.innerHTML = `${(weather.currently.humidity * 100).toFixed(0)}%`;
    const weatherWind = weatherOutWrap.querySelector('.wind-speed__value');
    weatherWind.innerHTML = `${weather.currently.windSpeed} m/s`;

    //Pogoda na 5 dni
    const weatherForecast = weatherOutWrap.querySelectorAll('.weather__forecast li');
    for (let i = 0; i < 5; i++) {
        const forecastDay = weatherForecast[i].querySelector('.day');
        forecastDay.innerHTML = whatDay(weather.daily.data[i + 1].time + '000');

        const forecastImage = weatherForecast[i].querySelector('img');
        forecastImage.src = `images/icons/${weather.daily.data[i + 1].icon}.svg`

        const forecastAverageTemperature = weatherForecast[i].querySelector('.temperature__value');
        forecastAverageTemperature.innerHTML = whatAverageTemperature(weather.daily.data[i + 1]);
    }

    //Funkcja dla obliczenia nazwy dnia
    function whatDay(num) {
        let day = new Date(+num).getDay();
        switch (day) {
            case 0:
                day = 'Niedziela';
                break;
            case 1:
                day = 'Poniedziałek';
                break;
            case 2:
                day = 'Wtorek';
                break;
            case 3:
                day = 'Środa';
                break;
            case 4:
                day = 'Czwartek';
                break;
            case 5:
                day = 'Piątek';
                break;
            case 6:
                day = 'Sobota';
                break;
        }
        return day;
    }
    //Funkcja dla obliczenie średniej temperatury
    function whatAverageTemperature(objOfDay) {
        const minTemperature = objOfDay.temperatureMin;
        const maxTemperature = objOfDay.temperatureMax;
        const result = (minTemperature + maxTemperature) / 2
        return result.toFixed(1);
    }
}

//Zamknięcie bloków przy nacisku
function closeBlocks() {
    const closeBlockButtot = document.querySelectorAll('button.btn--close');
    closeBlockButtot.forEach(item => {
        item.addEventListener('click', () => {
            if (item.parentElement.classList.contains('module__form')) {
                item.parentElement.hidden = true;
            }
            else {
                item.parentElement.remove();
            }
        });
    });
}

//Funkcja pokazuje spinner
function showLoading(spinner) {
    const spinnerOut = document.querySelector('.loading');

    if (spinner === true) {
        spinnerOut.style.display = 'flex';
    } else {
        spinnerOut.style.display = 'none';
    }

    return true;
}

//Funkcja, która ma zarządzać wszystkimi możliwościami pogody
async function manageWeather(lat, lon, city) {
    const weather = await searchActualWeather(lat, lon);

    //Ukryć spinner
    showLoading(false);
    if (weather === undefined) {
        alert(`Coś poszło nie tak 😕\nSpróbuj później!`);
        return false;
    }

    showWeatherBlock(weather, city);
    closeBlocks();
}