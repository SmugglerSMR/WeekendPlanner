// ======================================================================================
//
//				Request
//
// ======================================================================================

var Request = new function(){

	var self = this;
	
	this.backBody = false;
	this.backTitle = '';

	// -----------------------------------------------------------------------------  RequestGet
	this.get = function( param, callback ){		

		var ajax = new XMLHttpRequest();
		ajax.open('GET', '/api/'+param);
		ajax.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.01");
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		
		ajax.onreadystatechange = function()  {
								try
								{
									if  ( (this.readyState == 4) && (this.status == 200))
									{
										var text = this.response;
										
										callback(text);	
										
									}
								}
								catch (e) {}
							};
		ajax.onerror = function(){
								return null;
							};
					
		ajax.send( null );	
	}
	
	// -----------------------------------------------------------------------------	Request
	this.post = function( sendData, callback ){
	
		var sendParams = [];
			
		for( var k in sendData )	sendParams.push( k + "=" + encodeURIComponent( sendData[k] ) );

		if ('msg' in sendData && sendData.msg) {
			show_main_message('Saving ...', 5000);		
		}	
		
		var ajax = new XMLHttpRequest();
		ajax.open('POST', '/save');
		ajax.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.01");
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		
		ajax.onreadystatechange = function()  {
								try
								{
									if  ( (this.readyState == 4) && (this.status == 200))
									{
										var text = this.response;
										hide_main_message();		
										callback(text);	
									}
								}
								catch (e) {}
							};
		ajax.onerror = function(){
								return null;
							};
					
		ajax.send( sendParams.join("&") );	
	}	

	// -----------------------------------------------------------------------------	Request
	this.save = function( sendData, callback ){
	
		try {
			// Create a formdata object and add the files
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR submitForm', e);
		}

		try {
			$.ajax({
				url: '/save',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(resp, textStatus, jqXHR) {
				
					if(typeof resp.error === 'undefined') {
						// Success so call function to process the form
						callback(resp);	
					}
					else	{
						// Handle errors here
						console.log('ERRORS: ' + resp.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					// Handle errors here
					console.log('ERRORS: ', textStatus, errorThrown, jqXHR);
					// STOP LOADING SPINNER
				}
			});		
		}
		catch (e) {
			console.log('ERROR ajax', e);
		}
	}	

	// -----------------------------------------------------------------------------	
	//	Request - upload file (файл уже скачан и находитьсяв  POST)
	//
	this.upload = function( sendData, threadId, lnk, callback ){
	
		try {
			// Create a formdata object and add the files
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR upload submitForm', e);
		}
		data.append('thread_id', threadId);
		data.append('lnk', lnk);
		
		try {
			$.ajax({
				url: '/upload',
				type: 'POST',
				data: data,
				cache: false,
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(data, textStatus, jqXHR) {
					
					if(typeof data.error === 'undefined') {
						// Success so call function to process the form
						callback(data);	
					}
					else	{
						// Handle errors here
						console.log('ERRORS: ' + data.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					// Handle errors here
					console.log('ERRORS: ' + textStatus);
					// STOP LOADING SPINNER
				}
			});		
		}
		catch (e) {
			console.log('ERROR upload ajax', e);
		}
	}	

	// -----------------------------------------------------------------------------	Request
	//	Request - load file (передается ссылка - нужно закачать)
	//
	this.load = function( sendData, callback ){
	
		try {
			// Create a formdata object and add the files
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR submitForm', e);
		}
			
		try {
			$.ajax({
				url: '/load',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(data, textStatus, jqXHR) {
					if(typeof data.error === 'undefined') {
						// Success so call function to process the form
						callback(data);	
					}
					else	{
						// Handle errors here
						console.log('ERRORS: ' + data.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					// Handle errors here
					console.log('ERRORS: ' + textStatus);
					// STOP LOADING SPINNER
				}
			});		
		}
		catch (e) {
			console.log('ERROR ajax', e);
		}
	}	

	// -----------------------------------------------------------------------------	Request
	this.preload = function( sendData, callback ){
	
		try {
			// Create a formdata object and add the files
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR upload submitForm', e);
		}
			
		try {
			$.ajax({
				url: '/preload',
				type: 'POST',
				data: data,
				dataType: 'json',
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(data, textStatus, jqXHR) {
					if(typeof data.error === 'undefined') {
						// Success so call function to process the form
						callback(data);	
					}
					else	{
						// Handle errors here
						console.log('ERRORS: ' + data.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					// Handle errors here
					console.log('ERRORS: ' + textStatus);
					// STOP LOADING SPINNER
				}
			});		
		}
		catch (e) {
			console.log('ERROR upload ajax', e);
		}
	}	

	// -----------------------------------------------------------------------------	RequestCheck
	this.check = function( sendData, callback ){

		try {
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR submitForm', e);
		}
			
		try {
			$.ajax({
				url: '/check',
				type: 'POST',
				data: data,
				cache: false,
				processData: false, 
				contentType: false, 
				success: function(resp, textStatus, jqXHR) {
					if(typeof resp.error === 'undefined') {
						callback(resp);	
					}
					else	{
						console.log('ERRORS: ' + resp.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('ERRORS: ', textStatus, errorThrown, jqXHR);
				}
			});		
		}
		catch (e) {
			console.log('ERROR ajax', e);
		}
		
	
	}
	
	// -----------------------------------------------------------------------------	RequestRead
	this.read = function( sendData, callback ){

		try {
			var data = new FormData();
			$.each(sendData, function(key, value) {
				data.append(key, value);
			});
		}
		catch (e) {
			console.log('ERROR submitForm', e);
		}
			
		try {
			$.ajax({
				url: '/read',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'json',
				processData: false, 
				contentType: false, 
				success: function(resp, textStatus, jqXHR) {
					if(typeof resp.error === 'undefined') {
						callback(resp);	
					}
					else	{
						console.log('ERRORS: ' + resp.error);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('ERRORS: ', textStatus, errorThrown, jqXHR);
				}
			});		
		}
		catch (e) {
			console.log('ERROR ajax', e);
		}
	
	}
	
	// -----------------------------------------------------------------------------	
}