var URL = require('url');
var async = require('../app/async').async;
var config = require('../app/config');

var Expedia = require( "../app/expedia" );
var Flightstats = require( "../app/flightstats" );
var Webcams = require( "../app/webcams" );

const MAIN_CITY = { 'name': 'brisbane', x: 1880, y: 950 };

const CITY = [ { name: 'sydney',   x: 1770, y: 1300 },
    		   { name: 'canberra', x: 1700, y: 1450 },
    		   { name: 'darwin',   x: 830,  y: 280 },
    		   { name: 'perth',    x: 300,  y: 1300 }
    		 ];  


exports.index = function (req, res, next) {

	var info = {  main: {},
				  cities: []	
			   };

	var queryData = URL.parse(req.url, true).query;
	var showId = queryData.showId ? queryData.showId : null;

	async.chain( [

		function( chainCallback ){								// main sity name

			info.main['name'] = MAIN_CITY.name;
			info.main['x'] = MAIN_CITY.x;
			info.main['y'] = MAIN_CITY.y;

			Expedia.typeahead( MAIN_CITY.name, function(rez){  

						if (rez) {
							for (var i=0; i<rez.length; i++) {
								if (rez[i].type == 'MULTICITY') {
									info.main['displayName'] = rez[i].regionNames['displayName'];
									info.main['fullName'] = rez[i].regionNames['fullName'];
									info.main['lastSearchName'] = rez[i].regionNames['lastSearchName'];
									info.main['shortName'] = rez[i].regionNames['displayName'];	
									info.main['coordinates'] = rez[i].coordinates;
									info.main['airport'] = rez[i].hierarchyInfo.airport.airportCode;
									break;
								}
								else if (rez[i].type == 'AIRPORT') {
									info.main['displayName'] = rez[i].regionNames['displayName'];
									info.main['fullName'] = rez[i].regionNames['fullName'];
									info.main['lastSearchName'] = rez[i].regionNames['lastSearchName'];
									info.main['shortName'] = rez[i].regionNames['displayName'];	
									info.main['coordinates'] = rez[i].coordinates;
									info.main['airport'] = rez[i].hierarchyInfo.airport.airportCode;
								}
							}
						}	

						chainCallback();
			});
		},
		function( chainCallback ){								// main web cams 

			info.main['nearby'] = info.main.coordinates.lat+','+info.main.coordinates.long+',15';

			Webcams.get({  nearby:  info.main['nearby'],
			               show:    'webcams:image,location'
			            }, function(rez){
							  info.main['webcams'] = rez && rez.webcams ? rez.webcams : null;
			                  chainCallback();
			            });

		},
		function( chainCallback ){								// cities - name

			async.arrayProcess(CITY, function(city, next) {
		 
				get_city(city, function(data){

					info.cities.push( data );
					next();

				});

		    },  function(err) {
		        chainCallback();
		    });

		},
		function( chainCallback ){

			res.render('home', {
						title: 				'CAP API',
						config: 			escape(JSON.stringify(info)),
			});

		}
	]);



};


function get_city(city, callback) {

	var data = {};

	async.chain( [

		function( chainCallback ){								// main sity name

			data['name'] = city.name;
			data['x'] = city.x;
			data['y'] = city.y;

			Expedia.typeahead( city.name, function(rez){  

						if (rez) {
							for (var i=0; i<rez.length; i++) {
								if (rez[i].type == 'MULTICITY') {
									data['displayName'] = rez[i].regionNames['displayName'];
									data['fullName'] = rez[i].regionNames['fullName'];
									data['lastSearchName'] = rez[i].regionNames['lastSearchName'];
									data['shortName'] = rez[i].regionNames['displayName'];	
									data['coordinates'] = rez[i].coordinates;
									data['airport'] = rez[i].hierarchyInfo.airport.airportCode;
									break;
								}
								else if (rez[i].type == 'AIRPORT') {
									data['displayName'] = rez[i].regionNames['displayName'];
									data['fullName'] = rez[i].regionNames['fullName'];
									data['lastSearchName'] = rez[i].regionNames['lastSearchName'];
									data['shortName'] = rez[i].regionNames['displayName'];	
									data['coordinates'] = rez[i].coordinates;
									data['airport'] = rez[i].hierarchyInfo.airport.airportCode;
								}
							}
						}	

						chainCallback();
			});
		},
		function( chainCallback ){								// main web cams 

			data['nearby'] = data.coordinates.lat+','+data.coordinates.long+',15';

			Webcams.get({  nearby:  data['nearby'],
			               show:    'webcams:image,location'
			            }, function(rez){
							  data['webcams'] = rez && rez.webcams ? rez.webcams : null;
			                  callback(data);
			            });

		}
	]);

}