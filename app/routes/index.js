var URL = require('url');
var async = require('../app/async');
var config = require('../app/config');

var self = this;

exports.index = function (req, res, next) {

	var info = {  main: {},
				  cities: []	
			   };

	var queryData = URL.parse(req.url, true).query;
	var showId = queryData.showId ? queryData.showId : null;
    
    //res.writeHead(200, {'content-type':'text/html'});
    //res.write('Page in progress from index');
    // res.end();
    
    async.series( [
        function( chainCallback ){ //Sending Google Map Request

			res.render('home', {
						title: 				'**Unused',
						config: 			escape(JSON.stringify(info)),
						maps_key:           config['GOOGLE_MAPS_KEY']
			});

		}
     ]);

};