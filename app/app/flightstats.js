var request = require('request');

var Config = require('./config');

// --------------------------------------------------------------------
exports.get = function(params, callback) {

	if ( params.action === 'routes' ) {
		var url = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/route/status/';
		url += params.departureAirport +'/' + params.arrivalAirport +'/dep/';
		url += params.year + '/' + params.month + '/' + params.day;
		url += '?appId='+Config.FLIGHTSTATS.appId+'&appKey='
							+Config.FLIGHTSTATS.appKey;
		url += '&hourOfDay=0&utc=false&numHours=24&maxFlights=5';
	}
    
	var opts = {  url:      url,
				method:   'GET',
				json: true,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}};

	request( opts, function (error, response, body){

		try {
			callback(body);
		}
		catch(ex) {
			console.log('ERROR: flightstats', ex);
			callback(null);
		}
	});

};

