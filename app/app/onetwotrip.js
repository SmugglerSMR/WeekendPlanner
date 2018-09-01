var request = require('request');
var querystring = require('querystring');

var async = require( "./async" ).async;
var Config = require("./config");

// --------------------------------------------------------------------
exports.get = function(params, callback) {

  var url = 'https://www.onetwotrip.com/_api/searching/startSync4/?route=';

  url += ('00'+params.day.toString()).substr(-2, 2);
  url += ('00'+params.month.toString()).substr(-2, 2);
  url += params.from;
  url += params.to;

  url += '&ad=1&cn=0&in=0&showDeeplink=true&cs=E&source=&priceIncludeBaggage=false&serpVersion=300';

  var opts = {  url:      url,
                method:   "GET",
                json: true,
                headers: {
                    'Content-Type':   'application/json;charset=UTF-8',
                }
             };

  request( opts, function (error, response, body){

    callback(body);

  });



}

