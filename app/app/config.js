var _ = require("underscore");

var cfg = {
	"local":{
		HOST: "localhost",
		PORT: "8484",
		DEFAULT_COOKIES_DOMAIN: "",
		FLIGHTSTATS: {
			appId: '7f2f5bc3',
			appKey: '5d403f57186fd4aa6376a661a48c7196'
		},
		WEBCAMS: {
			appKey: 'umj4LLmXrnmshs0aRT86MMosAlHIp1WhH0Njsnz8WgKzEQEAyb'	
		}
	},
	"global":{
		HOST: "",
		PORT: "8484",
		DEFAULT_COOKIES_DOMAIN: "sadukow.com",
		FLIGHTSTATS: {
			appId: '7f2f5bc3',
			appKey: '5d403f57186fd4aa6376a661a48c7196'
		},
		WEBCAMS: {
			appKey: 'umj4LLmXrnmshs0aRT86MMosAlHIp1WhH0Njsnz8WgKzEQEAyb'	
		}
	}


};

var runEnv = process.env.NODE_ENV || process.argv[2];

console.log("Run env:", runEnv);

if( runEnv in cfg ){
	// apply config for current environment

	var envCfg = cfg[ runEnv ];

	for( var k in envCfg ){
		module.exports[k] = envCfg[k];
	}
}

module.exports.extend = function(conf){

  function _extend(dest, source){
    for(var k in source){
      if(typeof source[k] == "object" && typeof dest[k] == "object"){
        _extend(dest[k], source[k]);
      }
      else{
        dest[k] = source[k];
      }
    }
  }

  _extend(this, conf);

};

module.exports._b = function ( v ) {

	if( typeof v == "boolean" ){
		return v;
	}

	if( v == "true" ){
		return true;
	}

	return false;
}
