var scale = 1;

var info = null;

$(document).ready(function(){

	var path = window.location.pathname;

	if (config) {
		info = JSON.parse(DeCode(config));
	}
	console.log(info);

	show_main_city();

	show_other_city();


	$('#zoom_in').on('click', function(){
		if (scale<1.5) scale += 0.1;
		$('#page-wrapped').css({'zoom': scale, '-moz-transform': 'scale('+scale+');'})
		 
	});
	$('#zoom_out').on('click', function(){
		if (scale>0.3) scale -= 0.1;
		$('#page-wrapped').css({'zoom': scale, '-moz-transform': 'scale('+scale+');'})
	});
	$('#popup_close').on('click', function(){
		$('#modalfade').hide();
		$('#msgPopup').hide();
	});

});

// ----------------------------------------------
function _time(d) {
	var h = d.getHours();
	var m = d.getMinutes();
	return (h<10 ? '0'+h.toString() : h.toString()) + ':' + (m<10 ? '0'+m.toString() : m.toString());
}	
// ----------------------------------------------
function _duration(d) {
	var h = parseInt(d / 60);
	var m = d % 60;
	return (h>0 ? h.toString()+'h' : '') + (m>0 ? m.toString()+'m' : '');
}	
// ----------------------------------------------
function _airlines(fs, airlines) {
	for (var j=0; j<airlines.length; j++) {
		if (airlines[j].fs == fs) return airlines[j].name
	}
	return fs;
}	
// ----------------------------------------------
function _equipments(iata, equipments) {
	for (var j=0; j<equipments.length; j++) {
		if (equipments[j].iata == iata) return equipments[j].name
	}
	return fs;
}	

// ----------------------------------------------     --------------------------------
function show_main_city() {

	var e = $('<div class="main-city" style="left: '+info.main.x+'px; top:'+info.main.y+'px;" title="'+info.main.fullName+'"></div>');

	$('.page-wrapped').append(e);
	$('.page-wrapped').append($('<div class="main-city-name" style="left: '+(info.main.x-100)+'px; top:'+(info.main.y-30)+'px;" title="'+info.main.fullName+'">'+info.main.shortName+'</div>'));

	show_image_webcams(info.main.webcams, info.main.x, info.main.y);

	e.bind('click', open_main);
}

// ----------------------------------------------     --------------------------------
function show_other_city() {

	for (var i=0; i<info.cities.length; i++) {

		var city = info.cities[i];

		var e = $('<div class="other-city" style="left: '+city.x+'px; top:'+city.y+'px;" title="'+city.fullName+'" data-airport="'+city.airport+'"></div>');

		$('.page-wrapped').append(e);
		$('.page-wrapped').append($('<div class="other-city-name" style="left: '+(city.x-100)+'px; top:'+(city.y-30)+'px;" title="'+city.fullName+'">'+city.shortName+'</div>'));

		$('.page-wrapped').append($('<svg class="line"><line x1="'+(info.main.x+20)+'" y1="'+(info.main.y+20)+'" x2="'+(city.x+20)+'" y2="'+(city.y+20)+'" /></svg>'));

		show_image_webcams(city.webcams, city.x, city.y);

		e.bind('click', open_city);
	}
}

// ----------------------------------------------     --------------------------------
function show_image_webcams(webcams, x, y) {

	console.log(x, y);
	console.log(webcams);

	var k = webcams.length;
	if (k>5) k = 5;

	for (var i=0; i<k; i++) {

		var xx, yy = (x - (123*k/2)) + i*123;
		var yy;
		if (i==0) {
			yy = y + 40;
			xx = x - 60;
		}	
		else if(i==1) {
			yy = y + 10;
			xx = x - 184;
		}	
		else if(i==2) {
			yy = y + 10;
			xx = x + 63;
		}	
		else if(i==3) {
			yy = y - 20;
			xx = x - 307;
		}	
		else if(i==4) {
			yy = y - 20;
			xx = x + 186;
		}	
		var stl = 'top: '+yy+'px;left: '+xx+'px;';

		var h = '<div class="webcams-item" data-id="'+webcams[i].id+'" data-status="'+webcams[i].status+'" style="'+stl+'" title="'+webcams[i].title+'">'+
    		  	'    <img class="image" src="'+webcams[i].image.current.thumbnail+'">'+
		    	'</div>';

		$('#page-wrapped').append( $(h) );

	}

}	

// ----------------------------------------------     --------------------------------
function open_city(event) {

	var elemCity = $(this);

	var airport = elemCity.attr('data-airport');

	$('#modalfade').show();
	$('#msgPopup').show();

	$('#msgBody').empty().append($('<div class="loading icon-loading"></div>'));
	$('#msgTitle').html('<span class="title-city-text">Departure to '+airport+'</span></span>');

	var time = new Date().getTime();
	var date = new Date(time + 24 * 3600 * 1000); 

	get_flightstats({ 'action': 'routes',
					  'fromAirport': info.main.airport,
					  'toAirport': airport,
					  'year':   2018,
					  'month':  date.getMonth()+1,
					  'day': 	date.getDate()
					});
}	

// ----------------------------------------------   flightstats  --------------------------------
function get_flightstats(params) {

	var url = '/api/flightstats/routes/'+params.fromAirport+'/'+params.toAirport+'/'+params.year+'/'+params.month+'/'+params.day+'/';

	$.getJSON(url, function(rez){

		console.log(rez);

		if (rez.status == 'Error') {
			$('#modalfade').hide();
			$('#msgPopup').hide();
			return;
		}

		$('#msgBody').empty();

		$('#msgTitle').html('<span class="title-city-text">Departure to '+params.toAirport+'</span><span class="secondary">'+rez.date.weekday+', '+rez.date.mon+' '+rez.date.day+'</span>');

		h = '<div class="flight-listing-container">'+
			'  <ul class="results-list" id="results-list">'+
			'  </ul>'+
			'</div>';
		$('#msgBody').append($(h));

		var flights = rez.info.flightStatuses;
		var airlines = rez.info.appendix.airlines;
		var equipments = rez.info.appendix.equipments;
		console.log(flights);
		console.log(equipments);
		for (var i=0; i<flights.length; i++) {

			var d1 = new Date(flights[i].operationalTimes.publishedDeparture.dateLocal);
			var d2 = new Date(flights[i].operationalTimes.publishedArrival.dateLocal);

			h = '<li class="result-list-item">'+
				'  <div class="grid-container">'+
	            '    <div class="number-content">'+
	            '       <span>'+flights[i].flightNumber+'</span>'+
	            '    </div>'+
	            '    <div class="time-content">'+
	            '       <span>'+_time(d1)+'</span> - <span>'+_time(d2)+'</span>'+
	            '    </div>'+
				'    <div class="duration-content">'+
	            '		<span>'+_duration(flights[i].flightDurations.scheduledBlockMinutes)+'</span>'+
	            '    </div>'+
				'    <div class="airline-content">'+
	            '		<span>'+_airlines(flights[i].carrierFsCode, airlines)+'</span><br>'+
	            '		<span>'+_equipments(flights[i].flightEquipment.actualEquipmentIataCode, equipments)+'</span>'+
	            '    </div>'+
				'  </div>'+
				'</li>';

			$('#results-list').append($(h));	
		}	

		
	});


}

// ----------------------------------------------     --------------------------------
function open_main(event) {

	$('#modalfade').show();
	$('#msgPopup').show();

	$('#msgBody').empty().append($('<div class="loading icon-loading"></div>'));
	$('#msgTitle').html('<span class="title-city-text">Brisbane</span></span>');

	get_wikipedia();


}	

// ----------------------------------------------   flightstats  --------------------------------
function get_wikipedia() {

	$.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        data: { action: 'parse', 
        		page:   'Brisbane', 
        		format: 'json',
        		limit:  '10'
        },
        dataType: 'jsonp',
        success: function(rez){

        	console.log(rez);
        	if (rez) {

        		$('#msgBody').empty().html(rez.parse.text['*']);

			}
			else {
				$('#modalfade').hide();
				$('#msgPopup').hide();
			}
        }
    });


}

