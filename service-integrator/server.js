const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const isOdd = require('is-odd')

// create express app
const app = express();

const args = process.argv;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));


// the landing page page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// the endppoints page
app.get('/endpoints', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/endpoints.html'));
});


require('./app/routes/routes.js')(app);

// listen for requests
const port = args[2]

console.log("Is the port number odd?", isOdd(port))

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});
