const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const args = process.argv;

const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});

const DB_URL = "mongodb://mongodb:27017/productPlatform"
console.log(DB_URL)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database", DB_URL);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to simple product CRUD demo."});
});

require('./app/routes/routes.js')(app);

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});