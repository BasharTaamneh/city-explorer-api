'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
const axios = require('axios')
server.use(cors());
const getweatherData = require('./getWether')
const getmoviesData = require('./movieShow')





//localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})


//localhost:3001/test
server.get('/test', (request, response) => {
    response.send('your server is working')
})


server.get('/weather', getweatherData);


server.get('/movies', getmoviesData);


server.get('/*', (req, response) => {

    response.status(404).send({ Error_404: "Error 404 This Page NOT FOUND" })
})


server.listen(PORT, () => {
    console.log("listing on PORT 3001");
})


