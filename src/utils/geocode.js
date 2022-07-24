const request = require('postman-request');
const MAP_TOKEN = 'pk.eyJ1IjoiZWFsamtqIiwiYSI6ImNsNXZxa3o1cTBjY20zY21uc2w4ZG51dWsifQ.esAA1_no9LHeT7tvkc8KJQ';
const MAP_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const map_params = {
    access_token: MAP_TOKEN,
    limit: 1
}


const geocode = (adress, callback) => {
    request({
        url: `${MAP_URL}${encodeURIComponent(adress)}.json?${new URLSearchParams(map_params)}`,
        json: true
    }, 
    (error, { body }) => {
        if(error) {
            callback('Unable to connect to Map service');
        } else if(!body.features || body.features.length === 0 ) {
            callback('Invalid location');
        } else {
            const {center: [longitude, latitude], place_name} = body.features[0]
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: place_name
            })
        }
    });
}

module.exports = geocode;
