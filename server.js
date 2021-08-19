'use strict';

const express = require('express');
// const weatherData = require('./Data/weather.json');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
const axios = require('axios')
server.use(cors());


//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})


//localhost:3001/test
server.get('/test', (request, response) => {
    response.send('your server is working')
})


server.get('/weather', getweatherData);

function getweatherData(req, response) {
    let wetherSearchcity = req.query.city;
    //https://api.weatherbit.io/v2.0/forecast/daily?city=city-name&key=API_KEY
    let wetherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${wetherSearchcity.toLowerCase()}d&key=${process.env.WETHER_LIVE_API_KEY}`
    try {

        axios.get(wetherURL).then((weatherDataResults) => {
            console.log('inside axios');
            console.log(weatherDataResults.data.data)
            const weatherDataArray = weatherDataResults.data.data.map((item) => { return new Cityweather(item); }
            )
            weatherDataArray.splice(5, weatherDataArray.length)
            response.send(weatherDataArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        response.status(404).send(error)
    }
}
class Cityweather {
    constructor(item) {
        this.date = item.datetime;
        this.description = ` it's Low of (${item.low_temp} °C) & high of (${item.max_temp} °C) with ${item.weather.description}`;
    }
}



class movieShow {
    constructor(item) {
        this.title = item.original_title;
        this.src = ` https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    }
}

server.get('/movies', getmoviesData);

function getmoviesData(req, response) {
    let movieSearchcity = req.query.query;
    //https://api.themoviedb.org/3/search/movie?api_key={.....}&query={city_nam}
    let moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearchcity.toLowerCase()}`

    try {

        axios.get(moviesURL).then((moviesDataResults) => {
            console.log('inside axios');
            console.log(moviesDataResults.data.results)
            const moviesDataArray = moviesDataResults.data.results.map((item) => { return new movieShow(item); }
            )
            response.send(moviesDataArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        response.status(404).send(error)
    }
}
server.get('/*', (req, response) => {

    response.status(404).send({ Error_404: "Error 404 This Page NOT FOUND" })
})


server.listen(PORT, () => {
    console.log("listing on PORT 3001");
})


