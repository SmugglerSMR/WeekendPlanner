var request = require('request');
var querystring = require('querystring');

var async = require( "./async" ).async;
var Config = require("./config");

// --------------------------------------------------------------------
exports.get = function(params, callback) {

  var url = 'https://webcamstravel.p.mashape.com/webcams/list/';
  if ('limit' in params && params.limit) {
      url += 'limit='+params.limit + (params.offset ? ','+params.offset+'/' : '/');
  } 

  if (params.nearby)  url += 'nearby='+params.nearby;
  else if (params.country)  url += 'country='+params.country;

  url += '?lang=en';
  if ('show' in params && params.show) {
    url += '&show='+encodeURIComponent(params.show); 
  } 

  var opts = {  url:      url,
                method:   "GET",
                json:     true,
                headers:  {
                    "X-Mashape-Key":  Config.WEBCAMS.appKey,
                    "X-Mashape-Host": "webcamstravel.p.mashape.com"
                }
            };

  request( opts, function (error, response, body){

      try {
        if (body.status == 'OK') {
          callback(body.result);
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

