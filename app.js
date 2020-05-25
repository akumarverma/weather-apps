const express = require('express')
const weather = require('./weather')
const path = require('path')
const hbs = require('hbs')

app = express()

port = process.env.PORT || 3000;


// Express Configuration paths
const publicFileDirectory = path.join(__dirname, 'public')
const viewsDirectory = path.join(__dirname, 'templates/views')
const partialsDirectory = path.join(__dirname, 'templates/partials')


// Static file such as Javascript, CSS path
app.use(express.static(publicFileDirectory))


// View Engine and templates directories
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)

//partial Registration
hbs.registerPartials(partialsDirectory)


app.use(express.json())                                         // for parsing application/json
app.use(express.urlencoded({ extended: true }))                 // for parsing application/x-www-form-urlencoded


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amit Kumar Verma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amit Kumar Verma'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amit Kumar Verma'
    })
})

app.get('/weather/:address', (req, res) => {
    weather.getWeather(req.params.address).then((weather) => {
        res.send(weather)
    }).catch((e) => {
        res.send({ error: e })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        errorMessage: 'Requester resources not available',
        name: 'Amit kumar Verma'
    })
})

app.listen(port);