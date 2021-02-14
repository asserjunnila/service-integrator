const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const isOdd = require('is-odd')

const app = express();

const args = process.argv;

const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/endpoints', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/endpoints.html'));
});

require('./app/routes/routes.js')(app);

const port = args[2] || process.env.PORT

console.log("Is the port number odd?", isOdd(port))

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});