process.env.NODE_ENV = process.env.NODE_ENV || 'local';

var querystring = require('querystring');
var cookieSessions = require('cookie-sessions');
var request = require('request');

var fs = require('fs');

var config = require('./app/config');
var async = require( 'async' );

var Expedia = require( './app/expedia' );
var Flightstats = require( './app/flightstats' );
var Webcams = require( './app/webcams' );
//var OTT = require( './app/onetwotrip' );


console.log('-------test------------');


//Expedia.typeahead( 'brisabane', function(rez){  console.log(rez);  });

/*Flightstats.get({  'action':           'routes',
                   'departureAirport': 'BNE',
                   'arrivalAirport':   'DXB',
                   'year':             2018,
                   'month':            8,
                   'day':              26
          }, function(rez){
              console.log(rez);
          });*/

/*Webcams.get({  //nearby:  '-27.45,153.10,15',
                country: 'AU',
                show:    'webcams:image,location'

              }, function(rez){
                  console.log(rez);
              });*/

Webcams.get({   webcamId:  '1216143079',
                show:    'webcams:player,location'

              }, function(rez){
                Webcams.show(rez);
              });
              

/*OTT.get({ from: 'BNE',
          to:   'DXB',
          day: 1,
          month: 9
        }, function(rez){
  console.log(rez);
})              
*/

// ============================================================
function test_onetwotrip(params, callback) {




}


