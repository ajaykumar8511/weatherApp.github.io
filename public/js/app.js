var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');
const humidityElement = document.querySelector('.humidity_value');
const windElement = document.querySelector('.wind_value');
const feelElement = document.querySelector('.feel_value');
const sunriseElement = document.querySelector('.sunrise_value');
const sunsetElement = document.querySelector('.sunset_value');
const seaElement = document.querySelector('.sea_value');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    humidityElement.textContent = "";
    feelElement.textContent = "";
    sunriseElement.textContent= "";
    sunsetElement.textContent= "";
    seaElement.textContent= "";

    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
                humidityElement.textContent = "";
                feelElement.textContent = "";
                sunriseElement.textContent= "";
                sunsetElement.textContent= "";
                seaElement.textContent= "";
            } else {
                
                if (data.main === "Rain" || data.main === "fog") {
                   
                    weatherIcon.className = "wi wi-day-" + data.main;
                } else {
                    
                    weatherIcon.className = "wi wi-day-cloudy";
                }
               

                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                humidityElement.textContent = data.humidity_level;
                feelElement.textContent = (data.feel_like_temp - 273.5).toFixed(2) + String.fromCharCode(176);
                windElement.textContent = data.wind_speed;
                seaElement.textContent = data.sea_level;
                
                sunriseElement.textContent= new Date(data.sunrise_time * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                sunsetElement.textContent= new Date(data.sunset_time * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            }
        })
    });
})
