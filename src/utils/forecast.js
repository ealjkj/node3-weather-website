const request = require('postman-request');

const WEATHER_KEY = 'a1fabe7b4fe49882f3b20cd672d5a44f';
const WEATHER_URL = 'http://api.weatherstack.com/current';



const forecast = (latitude, longitude, callback) => {
    const weather_params = {
        access_key: WEATHER_KEY,
        query: [latitude, longitude],
        units: 'f'
    }

    request({
        url: `${WEATHER_URL}?` + new URLSearchParams(weather_params),
        json: true
    }, 
    (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            const {temperature, feelslike, weather_descriptions} = body.current; 
            callback(undefined, {temperature, feelslike, weather_descriptions});
        }
    });       
}

module.exports = forecast;