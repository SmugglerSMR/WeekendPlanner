var URL = require('url');

var Flightstats = require( "../app/flightstats" );

var self = this;


// ================================================================
exports.flightstats_routes = function (req, res, next) {

	var fromAir = req.params.fromAir;
	var toAir = req.params.toAir;
	var year = req.params.year;
	var month = req.params.month;
	var day = req.params.day;

	console.log(fromAir, toAir, year, month, day)

	var d = {	day: day,
				month: month,
				year: year	};
	d.date = new Date(d.year, d.month-1, d.day);
	d.weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][d.date.getDay()];
	d.mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.month-1];

	Flightstats.get({  
				   'action':           'routes',
                   'departureAirport': fromAir,
                   'arrivalAirport':   toAir,
                   'year':             year,
                   'month':            month,
                   'day':              day
          }, function(rez){
          		if (rez) {
          			res.json({status: 'Ok', info: rez, date: d});
          		}
          		else {
          			res.json({status: 'Error'});
          		}
          });

};


// ================================================================
