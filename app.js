const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));


app.get('', (req, res) => {
    
    // res.send("This is Weather App By Ajay Patani");

    res.render('index', {
        title: 'Weather App'
    })
})

// //localhost:3000/weather?address=Delhi
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName, humidity_level, feel_like_temp, wind_speed, sunrise_time, sunset_time, sea_level} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName, humidity_level, feel_like_temp, wind_speed, sunrise_time, sunset_time, sea_level);
        res.send({
            temperature,
            description,
            cityName,
            humidity_level,
            feel_like_temp,
            wind_speed,
            sunrise_time,
            sunset_time,
            sea_level
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})