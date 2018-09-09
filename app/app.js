process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const connect = require('connect');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser')

// ============= Setup
var config = require("./app/config");
var indx = require('./routes/index');
var readApi = require('./routes/api');

const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.PORT;
const host = process.env.OPENSHIFT_NODEJS_HOST || process.env.HOST || config.HOST;

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// ============= Configuration Using Express 4
app.use(logger('dev')) ;
app.use(cookieParser())
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'your secret here' }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
// app.use(function(req, res){
//     res.status(404);
//     console.log('Not found URL: ',req.url);
//     res.send({ error: 'Not found' });
//     return;
// });

// ============= API Routes
app.get('/', indx.index );
//app.get('/test', require('./routes/popup').index );
app.get('/api/flightstats/routes/:fromAir/:toAir/:year/:month/:day/',
             readApi.flightstats_routes );
app.get('/api/webcams/id/:id/', readApi.webcams_id );


app.listen(port, function () {
    console.log(`Express app listening at http://${host}:${port}/`);
});
