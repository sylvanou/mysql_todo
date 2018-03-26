const port = process.env.PORT || 5050;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const database = require('./database');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost5050");
    
    // Requrest methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

    // Set to true if you need the website to include cookies in the requests sent to the API
    // (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs'); // Set up ejs for templating *EJS automatically looks for VIEWS folder

app.use("/assets", express.static(__dirname + "/assets")); // Make available assets/folders

require('./app/routes')(app, database); // Initializing and start listening for routes

app.listen(port, function(err){
    if (err)console.log('error', err);

    console.log('Server listening on port: ' + port);
});
