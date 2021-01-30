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

// the landing page page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

require('./app/routes/routes.js')(app);

// listen for requests
const port = 3000

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});

