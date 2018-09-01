var URL = require('url');
var async = require('../app/async').async;
var config = require('../app/config');


exports.index = function (req, res, next) {

	var info = {"status":"Ok","info":{"request":{"departureAirport":{"requestedCode":"BNE","fsCode":"BNE"},"arrivalAirport":{"requestedCode":"DRW","fsCode":"DRW"},"date":{"year":"2018","month":"8","day":"27","interpreted":"2018-08-27"},"hourOfDay":{"requested":"0","interpreted":0},"utc":{"requested":"false","interpreted":false},"numHours":{"requested":"24","interpreted":24},"codeType":{},"maxFlights":{"requested":"5","interpreted":5},"extendedOptions":{},"url":"https://api.flightstats.com/flex/flightstatus/rest/v2/json/route/status/BNE/DRW/dep/2018/8/27"},"appendix":{"airlines":[{"fs":"AA","iata":"AA","icao":"AAL","name":"American Airlines","phoneNumber":"08457-567-567","active":true},{"fs":"TT","iata":"TT","name":"Tigerair Australia","active":true},{"fs":"EK","iata":"EK","icao":"UAE","name":"Emirates","phoneNumber":"800 777 3999","active":true},{"fs":"JQ","iata":"JQ","icao":"JST","name":"Jetstar","active":true},{"fs":"VA","iata":"VA","icao":"VOZ","name":"Virgin Australia","active":true},{"fs":"NZ","iata":"NZ","icao":"ANZ","name":"Air New Zealand","phoneNumber":"1-800-262-1234","active":true},{"fs":"EY","iata":"EY","icao":"ETD","name":"Etihad Airways","active":true},{"fs":"QF","iata":"QF","icao":"QFA","name":"Qantas","phoneNumber":"+61 2 9691 3636","active":true},{"fs":"SQ","iata":"SQ","icao":"SIA","name":"Singapore Airlines","phoneNumber":"+1 800 7423333","active":true}],"airports":[{"fs":"DRW","iata":"DRW","icao":"YPDN","name":"Darwin International Airport","city":"Darwin","cityCode":"DRW","stateCode":"NT","countryCode":"AU","countryName":"Australia","regionName":"Oceania","timeZoneRegionName":"Australia/Darwin","localTime":"2018-08-26T14:35:27.667","utcOffsetHours":9.5,"latitude":-12.407805,"longitude":130.877521,"elevationFeet":103,"classification":3,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/DRW?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/DRW?codeType=fs"},{"fs":"BNE","iata":"BNE","icao":"YBBN","name":"Brisbane Airport","city":"Brisbane","cityCode":"BNE","stateCode":"QLD","countryCode":"AU","countryName":"Australia","regionName":"Oceania","timeZoneRegionName":"Australia/Brisbane","localTime":"2018-08-26T15:05:27.667","utcOffsetHours":10,"latitude":-27.403031,"longitude":153.109058,"elevationFeet":13,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/BNE?codeType=fs","weatherUrl":"https://api.flightstats.com/flex/weather/rest/v1/json/all/BNE?codeType=fs"}],"equipments":[{"iata":"73H","name":"Boeing 737-800 (winglets) Passenger/BBJ2","turboProp":false,"jet":true,"widebody":false,"regional":false},{"iata":"320","name":"Airbus A320","turboProp":false,"jet":true,"widebody":false,"regional":false}]},"flightStatuses":[{"flightId":971236535,"carrierFsCode":"QF","flightNumber":"824","departureAirportFsCode":"BNE","arrivalAirportFsCode":"DRW","departureDate":{"dateLocal":"2018-08-27T08:40:00.000","dateUtc":"2018-08-26T22:40:00.000Z"},"arrivalDate":{"dateLocal":"2018-08-27T12:30:00.000","dateUtc":"2018-08-27T03:00:00.000Z"},"status":"S","schedule":{"flightType":"J","serviceClasses":"JY","restrictions":""},"operationalTimes":{"publishedDeparture":{"dateLocal":"2018-08-27T08:40:00.000","dateUtc":"2018-08-26T22:40:00.000Z"},"publishedArrival":{"dateLocal":"2018-08-27T12:30:00.000","dateUtc":"2018-08-27T03:00:00.000Z"},"scheduledGateDeparture":{"dateLocal":"2018-08-27T08:40:00.000","dateUtc":"2018-08-26T22:40:00.000Z"},"scheduledGateArrival":{"dateLocal":"2018-08-27T12:30:00.000","dateUtc":"2018-08-27T03:00:00.000Z"}},"codeshares":[{"fsCode":"AA","flightNumber":"7310","relationship":"L"},{"fsCode":"EK","flightNumber":"5824","relationship":"L"}],"flightDurations":{"scheduledBlockMinutes":260},"airportResources":{"departureTerminal":"D"},"flightEquipment":{"scheduledEquipmentIataCode":"73H","actualEquipmentIataCode":"73H"}},{"flightId":971257406,"carrierFsCode":"VA","flightNumber":"449","departureAirportFsCode":"BNE","arrivalAirportFsCode":"DRW","departureDate":{"dateLocal":"2018-08-27T09:45:00.000","dateUtc":"2018-08-26T23:45:00.000Z"},"arrivalDate":{"dateLocal":"2018-08-27T13:40:00.000","dateUtc":"2018-08-27T04:10:00.000Z"},"status":"S","schedule":{"flightType":"J","serviceClasses":"JY","restrictions":""},"operationalTimes":{"publishedDeparture":{"dateLocal":"2018-08-27T09:45:00.000","dateUtc":"2018-08-26T23:45:00.000Z"},"publishedArrival":{"dateLocal":"2018-08-27T13:40:00.000","dateUtc":"2018-08-27T04:10:00.000Z"},"scheduledGateDeparture":{"dateLocal":"2018-08-27T09:45:00.000","dateUtc":"2018-08-26T23:45:00.000Z"},"scheduledGateArrival":{"dateLocal":"2018-08-27T13:40:00.000","dateUtc":"2018-08-27T04:10:00.000Z"}},"codeshares":[{"fsCode":"EY","flightNumber":"6664","relationship":"L"},{"fsCode":"NZ","flightNumber":"7017","relationship":"L"},{"fsCode":"SQ","flightNumber":"6462","relationship":"L"}],"flightDurations":{"scheduledBlockMinutes":265},"airportResources":{"departureTerminal":"D","departureGate":"40B"},"flightEquipment":{"scheduledEquipmentIataCode":"73H","actualEquipmentIataCode":"73H"}},{"flightId":971215122,"carrierFsCode":"JQ","flightNumber":"674","departureAirportFsCode":"BNE","arrivalAirportFsCode":"DRW","departureDate":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"arrivalDate":{"dateLocal":"2018-08-28T00:25:00.000","dateUtc":"2018-08-27T14:55:00.000Z"},"status":"S","schedule":{"flightType":"J","serviceClasses":"RFJY","restrictions":""},"operationalTimes":{"publishedDeparture":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"publishedArrival":{"dateLocal":"2018-08-28T00:25:00.000","dateUtc":"2018-08-27T14:55:00.000Z"},"scheduledGateDeparture":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"scheduledGateArrival":{"dateLocal":"2018-08-28T00:25:00.000","dateUtc":"2018-08-27T14:55:00.000Z"}},"codeshares":[{"fsCode":"QF","flightNumber":"5674","relationship":"L"}],"flightDurations":{"scheduledBlockMinutes":250},"airportResources":{"departureTerminal":"D","departureGate":"38"},"flightEquipment":{"scheduledEquipmentIataCode":"320","actualEquipmentIataCode":"320"}},{"flightId":971247952,"carrierFsCode":"TT","flightNumber":"652","departureAirportFsCode":"BNE","arrivalAirportFsCode":"DRW","departureDate":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"arrivalDate":{"dateLocal":"2018-08-28T00:35:00.000","dateUtc":"2018-08-27T15:05:00.000Z"},"status":"S","schedule":{"flightType":"J","serviceClasses":"Y","restrictions":""},"operationalTimes":{"publishedDeparture":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"publishedArrival":{"dateLocal":"2018-08-28T00:35:00.000","dateUtc":"2018-08-27T15:05:00.000Z"},"scheduledGateDeparture":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"estimatedGateDeparture":{"dateLocal":"2018-08-27T20:45:00.000","dateUtc":"2018-08-27T10:45:00.000Z"},"scheduledGateArrival":{"dateLocal":"2018-08-28T00:35:00.000","dateUtc":"2018-08-27T15:05:00.000Z"},"estimatedGateArrival":{"dateLocal":"2018-08-28T00:35:00.000","dateUtc":"2018-08-27T15:05:00.000Z"}},"flightDurations":{"scheduledBlockMinutes":260},"airportResources":{"departureTerminal":"D","departureGate":"32"},"flightEquipment":{"scheduledEquipmentIataCode":"320","actualEquipmentIataCode":"320"}}]}};

	res.render('home', {
				title: 				'CAP API Popup',
				config: 			escape(JSON.stringify(info)),
	});

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