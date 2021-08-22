'use strict';
// let inMemory=require('./inMemory')

let inMemory = {}

const axios = require('axios')


class movieShow {
    constructor(item) {
        this.title = item.original_title;
        this.src = ` https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    }
}




function getmoviesData(req, response) {
    let movieSearchcity = req.query.query;
    //https://api.themoviedb.org/3/search/movie?api_key={.....}&query={city_nam}
    let moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieSearchcity.toLowerCase()}`
    // console.log(inMemory);
    if (inMemory[movieSearchcity] !== undefined) {
        console.log(' cache hit , data in cache memory');
        response.send(inMemory[movieSearchcity]);
    }

    else {
        console.log(' cache miss , send req to themoviedb API');

        try {

            axios.get(moviesURL).then((moviesDataResults) => {
                console.log('inside axios');
                // console.log(moviesDataResults.data.results)
                const moviesDataArray = moviesDataResults.data.results.map((item) => { return new movieShow(item); }
                )
                inMemory[movieSearchcity]=moviesDataArray;
                response.send(moviesDataArray)
            })
        }
        catch (error) {
            console.log('error from axios', error)
            response.status(404).send(error)
        }
    }
}





module.exports = getmoviesData;