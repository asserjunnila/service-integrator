const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const args = process.argv;

const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database", process.env.DB_URL);    
}).catch(err => {
    console.log('Could not connect to the database ${process.env.DB_URL}. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to simple product CRUD demo."});
});

require('./app/routes/routes.js')(app);

const port = args[2] || process.env.PORT

app.listen(port, () => {
    console.log("Server is listening on port ", port);
});