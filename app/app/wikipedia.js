var request = require('request');
var querystring = require('querystring');

var async = require( "./async" ).async;
var Config = require("./config");

// --------------------------------------------------------------------
exports.get = function(params, callback) {

  var pageId = null;
  var images = [];

  async.chain([
      function(next) { 
        var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&limit=15&callback=?&titles=';
        if (params.search)  url += params.search;

        request( {  url:    url,
                    method: "GET",
                    json:   true,
                 }, function (error, response, body){

                  try {
                    var info = JSON.parse(body.substring(5, body.length-1));
                    if (info.query) {
                      var pages = info.query.pages;
                      for (var k in pages) {
                        pageId = pages[k].pageid;
                        break;            
                      }     
                      next(); 
                    }
                    else {
                      callback(null);
                    }
                  }
                  catch(ex) {
                    console.log('ERROR: wikipedia', ex);
                    callback(null);

                  }
              });
      },
      function(next) { 
        console.log('pageId:', pageId);        
        request( {  url:    'http://en.wikipedia.org/w/api.php',
                    method: "GET",
                    qs: {
                      action: 'query', 
                      pageids: pageId, 
                      format: 'json',
                      prop:   'images',
                      limit:  10
                    },
                    json:   true,
                 }, function (error, response, body){

                  try {
                    if (body.query) {
                      for (var k in body.query.pages) {
                        var img = body.query.pages[k].images;
                        for (var i=0; i<img.length; i++)  images.push(img[i].title);
                        break;            
                      }     
                      console.log(images);                      
                      next(); 
                    }
                    else {
                      callback(null);
                    }
                  }
                  catch(ex) {
                    console.log('ERROR: wikipedia', ex);
                    callback(null);

                  }
              });
      },
      function(next) { 
        request( {  url:    'http://en.wikipedia.org/w/api.php',
                    method: "GET",
                    qs: {
                      action: 'parse', 
                      page:   params.search, 
                      format: 'json',
                      limit:  10
                    },
                    json:   true,
                 }, function (error, response, body){

                  try {
                    if (body.query) {
                      for (var k in body.query.pages) {
                        var img = body.query.pages[k].images;
                        for (var i=0; i<img.length; i++)  images.push(img[i].title);
                        break;            
                      }     
                      next(); 
                    }
                    else {
                      callback(null);
                    }
                  }
                  catch(ex) {
                    console.log('ERROR: wikipedia', ex);
                    callback(null);

                  }
              });

      }
  ]); 

}

