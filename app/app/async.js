const MAX_CHAIN_EXECUTION = 1000; // defined max stacking items for async functions, if execution more than this value - use setTimeout, to out of stack

exports.async = 
{
	chain: function( callbacksChain ){
		
		var dataObject = {};
		
		var f = function(){
			if( callbacksChain.length > 0 ){
				var nextCallback = callbacksChain.shift();						
				nextCallback( f, dataObject );
			}					
		}
		
		f();
		
	},
	
	arrayProcess: function( dataArray, callback, finishCallback ){
		
		var _countChainExecutions = 0;
		
		var f = function( i ){
			
			if( i >= dataArray.length ){
				finishCallback();
			}
			else{
				_countChainExecutions++;
				
				if( _countChainExecutions >= MAX_CHAIN_EXECUTION ){
					_countChainExecutions = 0;	
					
					setTimeout(function(){
						
						callback( dataArray[i], function(){
							f(i + 1);
						} );
												
					}, 0);
				}
				else{
					
					callback( dataArray[i], function(){
						f(i + 1);
					} );
					
				}

			}
			
		}	
		
		f(0);			
		
	},
	
	// simulteneusely process
	sArrayProcess: function( dataArray, callback, finishCallback ){
		
		var countProcessed = 0;
		
		if( dataArray.length == 0 ){
			return finishCallback();
		}
		
		dataArray.forEach(function( item ){
			
			callback( item, function(){
				
				countProcessed++;
				
				if( countProcessed == dataArray.length ){
					finishCallback();
				}
				
			} );
			
		});
		
	},
	
	// controlled asynchronous cicle
	cc: function( stateFunction ){
		
		var rf = function( result ){
			
			if( result == "break" ){
				return;
			}
			
			stateFunction( rf );
			
		};
		
		stateFunction( rf );
		
	}	
};
