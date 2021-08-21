'use strict';

const axios=require('axios')

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

module.exports=getweatherData;