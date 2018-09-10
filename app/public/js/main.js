var info = null;
var country = null;
var center = {};
var options = {};

var elemOverlays = [];

var map, geocoder, container;
var image_red, image_green;

google.maps.event.addDomListener(window, 'load', init_maps);

USGSOverlay.prototype = new google.maps.OverlayView();

geocoder = new google.maps.Geocoder();		

$(document).ready(function(){

	var path = window.location.pathname;

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
		if (airlines[j].fs == fs) return airlines[j].name;
	}
	return fs;
}	
// ----------------------------------------------
function _equipments(iata, equipments) {
	for (var j=0; j<equipments.length; j++) {
		if (equipments[j].iata == iata) return equipments[j].name;
	}
	return iata;
}	
// ----------------------------------------------
function  DeCode( date ){
    return unescape(date);
}
// ----------------------------------------------
function open_city(airport) {

	$('#modalfade').show();
	$('#msgPopup').show();

	$('#msgBody').empty().append($('<div class="loading icon-loading"></div>'));
	$('#msgTitle').html('<span class="title-city-text">Departure to '+airport+'</span></span>');

	var time = new Date().getTime();
	var date = new Date(time + 24 * 3600 * 1000); 

	get_flightstats({ 	'action': 'routes',
						'fromAirport': info.main.airport,
						'toAirport': airport,
						'year':   2018,
						'month':  date.getMonth()+1,
						'day': 	date.getDate()
					});
}	

// ---------------------------------------------- 
function open_webcam(id, title) {

	$('#modalfade').show();
	$('#msgPopup').show();

	$('#msgBody').empty().append($('<div class="loading icon-loading"></div>'));
	$('#msgTitle').html('<span class="title-city-text">'+title+'</span></span>');

	var url = '/api/webcams/id/'+id+'/';
	$.getJSON(url, function(rez){
				if (rez.status == 'Error') {
					$('#modalfade').hide();
					$('#msgPopup').hide();
					return;
				}

				var webcams = rez.info.webcams;

				if (webcams && webcams.length>0) {
					var url = webcams[0].player.month.embed;
					$('#msgBody').empty();
					var h = '<iframe src="'+url+'" style="width: 100%; height: 100%"></iframe>';
					$('#msgBody').append($(h));
				}		 		  
	});
}	

// --------   flightstats  ------
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

		var h = '<div class="flight-listing-container">'+
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

			h = 	'<li class="result-list-item">'+
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



//------------------// ------------     -------------
function init_maps() {

	if (config) {
		info = JSON.parse(DeCode(config));
	}
	console.log(info);

	image_red = {
		url: '/img/circle_red_20x20.png',
		size:   new google.maps.Size(20, 20),     	
		origin: new google.maps.Point(0, 0),    	
		anchor: new google.maps.Point(10, 10)		
	};
	image_green = {
		url: '/img/circle_green_24x24.png',
		size:   new google.maps.Size(24, 24),     	
		origin: new google.maps.Point(0, 0),    	
		anchor: new google.maps.Point(12, 12)		
	};
		
	container = document.getElementById('map');

	async.series([
		function(callback) {
			geocoder.geocode( { 'address': info.main.lastSearchName}, function(results, status) {		

				if (status == google.maps.GeocoderStatus.OK) {

					var adrs =  results[0].address_components;
					for (var i=0; i<adrs.length; i++) {

						if (i==0) {
							info.main.name = adrs[i].long_name;
						}

						if (adrs[i].types.indexOf('country') != -1) {
							country = adrs[i].long_name;
							break;	
						}
					}

					info.main.lat = results[0].geometry.location.lat();
					info.main.lng = results[0].geometry.location.lng();
					info.main.geometry = results[0].geometry.location;

					console.log(info.main);
					if (country) {						
						callback();
					}	
				}	
			});
		},
		function(callback) { 
		
			geocoder.geocode( { 'address': country}, function(results, status) {		
				console.log(results, status);				
				
				if (status == google.maps.GeocoderStatus.OK) {

					center.lat = results[0].geometry.location.lat();
					center.lng = results[0].geometry.location.lng();

					callback();
				}
			});			
		
		},
		function(callback) { 

			console.log(center);
		
			options = {
				zoom: 5,	
				center: center,	
				//mapTypeId: google.maps.MapTypeId.TERRAIN		
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};    
			
			map = new google.maps.Map(container, options);

			google.maps.event.addListener(map, 'click', function(event) {
			
				console.log('maps click', event);

				var latitude = event.latLng.lat();
				var longitude = event.latLng.lng();

				for (var i=0; i<elemOverlays.length; i++) {

					var lat1 = elemOverlays[i].coord1.lat();
					var lng1 = elemOverlays[i].coord1.lng();
					var lat2 = elemOverlays[i].coord2.lat();
					var lng2 = elemOverlays[i].coord2.lng();

					var lat_min = Math.min(lat1, lat2);
					var lat_max = Math.max(lat1, lat2);
					var lng_min = Math.min(lng1, lng2);
					var lng_max = Math.max(lng1, lng2);

					//console.log(lat1, latitude, lat2, lng1, longitude, lng2, elemOverlays[i].webcamId);
					//console.log(lat_min, latitude, lat_max, lng_min, longitude, lng_max, elemOverlays[i].webcamId);

					if (latitude > lat_min && latitude < lat_max && longitude > lng_min && longitude < lng_max) {
						open_webcam(elemOverlays[i].webcamId, elemOverlays[i].webcamTitle);
					}

				}

			});

			setTimeout( function() {
				callback();
			}, 500);	
		},	
		function(callback){
		
			document.getElementById('button-change').addEventListener('click', function(event) {
				change_main_city();				
			});

			callback();

		},		
		function(callback) { 
	
			build_map();
				
		},
	
	]);
}	

function build_map( callback ) {

	async.series([
		function(callback) { 
		
			info.main.marker =  new google.maps.Marker({
				position: info.main.geometry,
				map: map,
				icon: image_red,
			});	

			callback();  
		},
		function(callback) {

			show_cities( function(){
				callback();
			});

		},
		function(callback) { 

			if (info.main.webcams) {

                info.main.overlay = set_map_webcams(new google.maps.
                    LatLng(info.main.lat, info.main.lng), info.main.webcams, info.main.ps);	
			}	

			callback();  
		}	
	]);

}	

function show_cities( callback ) {

	for (var j=0; j<info.cities.length; j++) {
		info.cities[j].ind = j;
	}

	async.eachSeries(info.cities, show_city, callback);
		
}

function show_city( city, callback ) {

	console.log(city);

	async.series([
		function(cb) {
	
			geocoder.geocode( { 'address': city.lastSearchName}, function(results, status) {		

				if (status == google.maps.GeocoderStatus.OK) {

					var adrs =  results[0].address_components;
					city.name = adrs[0].long_name;

					city.lat = results[0].geometry.location.lat();
					city.lng = results[0].geometry.location.lng();
					city.geometry = results[0].geometry.location;

					cb();
				}	
			});

		},
			
		function(cb) { 

			city.marker =  new google.maps.Marker({
				position: city.geometry,
				map: map,
				icon: image_green,
			});	

			city.marker.addListener('click', function() {
				open_city(city.airport);
			});

			cb();	
		},
			
		function(cb) { 

			var path = [	new google.maps.LatLng( info.main.lat, info.main.lng ), 
							new google.maps.LatLng( city.lat, city.lng )
						];

			city.route = new google.maps.Polyline({
					path: path, 
					geodesic: true, 
					map: map 
				});				

			cb();	
		},
				
		function() { 

			if (city.webcams && city.webcams.length>0) {

				city.overlay = set_map_webcams(new google.maps.LatLng(city.lat, city.lng), city.webcams, city.ps);	

			}	

			callback();
		}
	]);
}


function set_map_webcams(coordinates, webcams, ps) {

	console.log('set_map_webcams', coordinates, webcams, ps);

	if (webcams && webcams.length>0) {
	
		var point1 = latLng2Point(coordinates, map);
		
		if (ps == 'right') {
			point1.x = point1.x+15;
		}
		else if (ps == 'left') {
			point1.x = point1.x-80;
		}
		else if (ps == 'bottom') {
			point1.y = point1.y+15;
		}
		else if (ps == 'top') {
			point1.y = point1.y-62;
		}

		var coord1 = point2LatLng(point1, map);
		
		point1.x = point1.x+64;
		point1.y = point1.y+48;

		var coord2 = point2LatLng(point1, map);

		var bounds = new google.maps.LatLngBounds( coord1, coord2 );

		var srcImage = webcams[0].image.current.thumbnail;

		var overlay = new USGSOverlay(bounds, srcImage, map);

		elemOverlays.push({
							webcamId: webcams[0].id,
							webcamTitle: webcams[0].title,
							webcamLocation: webcams[0].location,
							coord1: coord1,
							coord2: coord2
						});

		return overlay;
	} else  {
		return null;
	}	
}	

function pixelOffsetToLatLng(offsetx,offsety) {
	var latlng = map.getCenter();
	var scale = Math.pow(2, map.getZoom());
	var nw = new google.maps.LatLng(
		map.getBounds().getNorthEast().lat(),
		map.getBounds().getSouthWest().lng()
	);
  
	var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
	var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0);
  
	var worldCoordinateNewCenter = new google.maps.Point(
		worldCoordinateCenter.x - pixelOffset.x,
		worldCoordinateCenter.y + pixelOffset.y
	);
  
	var latLngPosition = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
  
	return latLngPosition;
}

/** @constructor */
function USGSOverlay(bounds, image, map) {
	
	// Now initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;

	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;

	// Explicitly call setMap on this overlay
	this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {
	
	var div = document.createElement('div');
	div.style.border = 'solid';
	div.style.borderWidth = '2px';
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	div.appendChild(img);

	this.div_ = div;

	// Add the element to the "overlayImage" pane.
	var panes = this.getPanes();
	panes.overlayImage.appendChild(this.div_);
};

USGSOverlay.prototype.draw = function() {

	// Check image
	if(this.image_ === null) {
		var div = this.div_;
		div.style.left = '-50%';
		div.style.top = '-50%';
		div.style.width = '150px';
		div.style.height = '50px';
		div.innerHTML='<div style="margin-top: 10px;">Change Main City.</div>';
		
		return;
	} 	
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();

	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	var left = Math.min(sw.x, ne.x);
	var top = Math.min(sw.y, ne.y);
	var width = Math.abs(sw.x - ne.x);
	var height = Math.abs(sw.y - ne.y);

	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = left.toString() + 'px';
	div.style.top = top.toString() + 'px';
	div.style.width = width.toString() + 'px';
	div.style.height = height.toString() + 'px';
};

USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
};

// Set the visibility to 'hidden' or 'visible'.
USGSOverlay.prototype.hide = function() {
	if (this.div_) {
		// The visibility property must be a string enclosed in quotes.
		this.div_.style.visibility = 'hidden';
	}
};

USGSOverlay.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};

USGSOverlay.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility === 'hidden') {
		this.show();
		} else {
		this.hide();
		}
	}
};

// Detach the map from the DOM via toggleDOM().
// Note that if we later reattach the map, it will be visible again,
// because the containing <div> is recreated in the overlay's onAdd() method.
USGSOverlay.prototype.toggleDOM = function() {
	if (this.getMap()) {
		// Note: setMap(null) calls OverlayView.onRemove()
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
};

function latLng2Point(latLng, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}  

function point2LatLng(point, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
	return map.getProjection().fromPointToLatLng(worldPoint);
}      


// ---------------------------------------------- 
function change_main_city() {

	$('#modalfade').show();
	$('#msgPopup').show();

	$('#msgTitle').html('<span class="title-city-text">Change Main City</span></span>');

	var bl = $('<div class="change-city-list"></div>');
	$('#msgBody').empty().append(bl);
	
	var inp = $('<div class="change-city-item"><input type="radio" checked id="city_"'+info.main.name+'"" name="main-city" value="'+info.main.name+'"><label for="city_"'+info.main.name+'">'+info.main.name+'</label></div>')
	bl.append(inp);

	for (var j=0; j<info.cities.length; j++) {

		inp = $('<div class="change-city-item"><input type="radio" id="city_"'+info.cities[j].name+' name="main-city" value="'+info.cities[j].name+'"><label for="city_"'+info.main.name+'">'+info.cities[j].name+'</label></div>');
		bl.append(inp);
	}

	bl.append( $('<div class="change-city-button"><button id="submit-button" class="submit-button">Submit</button></div>') );

	bl.find('#submit-button').bind('click', function(){

		set_main_city( bl.find('input:checked').val() );

	});

}  

// ---------------------------------------------- 
function set_main_city(val) {

	$('#modalfade').hide();
	$('#msgPopup').hide();

	info.main.marker.setMap(null);
	for (var j=0; j<info.cities.length; j++) {
		info.cities[j].marker.setMap(null);
		info.cities[j].route.setMap(null);
	}	

	console.log('set_main_city', val);

	var m = info.main;

	for (var j=0; j<info.cities.length; j++) {
		if (info.cities[j].name === val ) {
			info.main = info.cities[j];
			info.cities[j] = m;
		}
	}	

	console.log(info);

	build_map();

}	