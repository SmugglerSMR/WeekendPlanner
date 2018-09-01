process.env.NODE_ENV = process.env.NODE_ENV || 'local';

var express = require("express");
var app = express();
var http = require('http');
var server = http.createServer(app);
var connect = require('connect') ;
var cookieSessions = require('cookie-sessions');

var config = require("./app/config");

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || config.PORT;
var host = process.env.OPENSHIFT_NODEJS_HOST || process.env.HOST || config.HOST;

if (host) {
	server.listen(port, host);
}
else {
	server.listen(port);
}
console.log("Express server listening on\n <"+host+"> : <"+port+">");

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/favicon.ico'));


//==================================================== MAIN MODULE =====================================
var readApi = require('./routes/api');
var indx = require('./routes/index');

// =============================================================
// Configuration
app.use(connect.logger('dev')) ;
app.use(connect.bodyParser()) ;
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here'} ));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.status(404);
    console.log('Not found URL: ',req.url);
    res.send({ error: 'Not found' });
    return;
});

//==========================================================================  API  Routes
/*app.get('/api/feeds/:list', readApi.feeds );
app.get('/api/category/:category/feeds/:last', readApi.category_feeds );
app.get('/api/categories', readApi.categories );
app.get('/api/coin/:lastEditeDon/:list', readApi.coin );
app.get('/api/start/addon', readApi.start );
app.get('/api/search/feedly/auto', readApi.search_feedly );
app.get('/api/search/twitter/auto', readApi.search_twitter );
app.get('/api/search/ticker/auto', readApi.search_ticker );
app.get('/api/search/telegram/auto', readApi.search_telegram );
app.get('/api/subscriptions', readApi.subscriptions );
app.get('/api/rss/check/:url', readApi.rss_check );*/

app.get('/', indx.index );
app.get('/home', indx.index );
app.get('/test', require('./routes/popup').index );
app.get('/api/flightstats/routes/:fromAir/:toAir/:year/:month/:day/', readApi.flightstats_routes );

