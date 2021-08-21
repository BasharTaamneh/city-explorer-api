'use strict';
let inMemory=require('./inMemory')
const axios=require('axios')



class Cityweather {
    constructor(item) {
        this.date = item.datetime;
        this.description = ` it's Low of (${item.low_temp} °C) & high of (${item.max_temp} °C) with ${item.weather.description}`;
    }
}




function getweatherData(req, response) {
    let wetherSearchcity = req.query.city;
    //https://api.weatherbit.io/v2.0/forecast/daily?city=city-name&key=API_KEY
    let wetherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${wetherSearchcity.toLowerCase()}d&key=${process.env.WETHER_LIVE_API_KEY}`

    if (inMemory[wetherSearchcity] !== undefined ) {
        console.log(' cache hit , data in cache memory');
        response.send(inMemory[wetherSearchcity]);
     }
      else{
        console.log(' cache miss , send req to weatherbit API');
        try {

            axios.get(wetherURL).then((weatherDataResults) => {
                console.log('inside axios');
                // console.log(weatherDataResults.data.data)
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

    
    
}


module.exports=getweatherData;