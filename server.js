// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express()
const port = 3000

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// GET route
app.get('/entry', sendData);
//POST route
app.post('/entry', addEntry);


function sendData(req, res) {
    res.send(projectData);
};

function addEntry(req, res) {
    let data = req.body;
    projectData["temp"] = data.temp;
    projectData["feeling"] = data.feeling;
    projectData["date"] = data.date;
    res.send(projectData);
};

// Setup Server
app.listen(port, () => console.log(`Weather journal app listening on port ${port}!`))