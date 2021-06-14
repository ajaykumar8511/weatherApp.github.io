const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({ url, json: true }, (error, { body }) => {
        if (error) 
        {
            callback("Can't fetch data from open weather map api ", undefined);
        } 
        else if (!body.main || !body.main.temp || !body.name || !body.weather || !body.main.humidity || !body.main.feels_like || !body.wind.speed || !body.sys.sunrise || !body.sys.sunset ) 
        {   
           
            console.log(body);
            callback("Unable to find required data, try another location", undefined);
        } 
        else 
        {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                humidity_level: body.main.humidity,
                feel_like_temp: body.main.feels_like,
                wind_speed: body.wind.speed,
                sunrise_time: body.sys.sunrise,
                sunset_time: body.sys.sunset,
                sea_level: body.main.sea_level,
            })
        }
    })
}

module.exports = weatherData;