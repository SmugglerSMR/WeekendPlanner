var request = require('request');
var querystring = require('querystring');

var async = require( "./async" ).async;

var Config = require("./config");

// --------------------------------------------------------------------
exports.typeahead = function(city, callback) {

  var opts = { 	uri:     'https://suggest.expedia.com/api/v4/typeahead/'+city,
				        method: 	"GET",
               	qs: {
                  client:   'Homepage',
                  siteid:   1,
                  guid:     'efc101210cd44f609055cd08f90891fd',
                  lob:      'FLIGHTS',
                  locale:   'en_US',
                  expuserid: -1,
                  regiontype: 95,
                  ab:         '',
                  dest:       false,
                  maxresults: 10,
                  features:   'nearby_airport%7Cta_hierarchy',
                  format:     'jsonp',
                  device:     'Desktop',
                  personalize: 'true'
               	},               
               	json: true,
      		    	headers: {
		      					'Content-Type':   'application/json;charset=UTF-8',
		      			}
			};

	request( opts, function (error, response, body){

      try {
        var info = JSON.parse(body.substring(1, body.length-1));
        if (info.rc == 'OK') {
          callback(info.sr);
        }
        else {
          callback(null);
        }
      }
      catch(ex) {
        callback(null);

      }
  });

}

