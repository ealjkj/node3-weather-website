const path = require('path');
const express = require('express');
const hbs = require('hbs'); 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views'); 
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
hbs.registerPartials(partialsPath);

// Setup static directory location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jorch'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jorch'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is my msg example',
        title: 'Help',
        name: 'Jorch'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You should povide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            } 
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            });
        });
    });
});
app.get('/products', (req, res) => {
    
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jorch',
        msg: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jorch',
        msg: 'Page not found'
    });
});

app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
});