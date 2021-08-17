'use strict';

const express = require('express');
const weatherData = require('./Data/weather.json');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());


//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})


//localhost:3001/test
server.get('/test', (request, response) => {
    response.send('your server is working')
})


class Cityweather {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
    }
}


//localhost:3001/weather?searchQuery=Seattle&lat=47.60621&lon=-122.33207
server.get('/weather', (req, response) => {
    let cityName = req.query.searchQuery;
    let citylat = req.query.lat;
    let citylon = req.query.lon;
    console.log(cityName);
    let SelectedCity = weatherData.find(item => {
        // console.log(item);
        // console.log(item.city_name);

        if (item.city_name.toLowerCase() === cityName.toLowerCase()) {
            return item;
        }
    })
    try {

        let CityweatherArr = SelectedCity.data.map((item) => {
            return new Cityweather(item);
        })
        console.log(CityweatherArr);
        response.send(CityweatherArr)
    } catch {

        response.send("NOT FOUND: Error We Can't find your data")
    }


})


server.get('*', (req, response) => {

    response.status(400).send("NOT FOUND")
})


server.listen(PORT, () => {
    console.log("listing on PORT 3001");
})