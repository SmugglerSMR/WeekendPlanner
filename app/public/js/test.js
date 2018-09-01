
window.onload=function () {

	$('.js-app-admin-sql').val('SHOW PROCESSLIST');

	/*$('.js-main-action-clear').off("click").on("click", function (e) {

		$(this).hide();

		var sendData = {
					type: 		 "mysql_test_clear" };

		Request.save(sendData, function(result) {

			console.log(result);

			$('.js-main-action-clear').show();

		});

	});

	$('.js-main-action-double').off("click").on("click", function (e) {

		$(this).hide();

		var sendData = { type: "mysql_double_clear" };

		Request.save(sendData, function(result) {

			console.log(result);

			$('.js-main-action-double').show();

		});

	});*/

	$('.js-check-button').off("click").on("click", function (e) {

		$(this).hide();

		var sendData = { type: 	"mysql_check_rows",
						 id1:   $('#feed_id_1').val(),
						 id2:   $('#feed_id_2').val(),
						};

		Request.save(sendData, function(result) {

			console.log(result);

			$('.js-check-button').show();

			if ( result.status == 'Ok') {
				$('.js-check-results').text(result.value);

				show_data(document.getElementById("container"), result.rows, '600px');



			}

		});
	});

	$('.js-time-button').off("click").on("click", function (e) {

		var v = $('#time_input').val();

		var t = new Date( parseInt(v)*1000 );

		$('.js-time-output').text(t.toString());

	});
	$('.js-current-time-button').off("click").on("click", function (e) {

		var t = parseInt((new Date).getTime()/1000);
		$('.js-time-output').text(t.toString());

	});

	$('.js-search-button').off("click").on("click", function (e) {

		$(this).hide();

		var sendData = { type: 	"mysql_search_rows",
						 				 text:   $('#search_input').val(),
									 };

		Request.save(sendData, function(result) {

			console.log(result);

			if (result.status == 'Error') return;

			show_table(document.getElementById("container"), result, '600px', function(e){

				var url = "/home?showId="+$(this).text();
				var win = window.open(url, '_blank');
				win.focus();

			});

			$('.js-search-button').show();

		});
	});
	$('.js-search-clear').off("click").on("click", function (e) {
		$("#container").empty();
	});

	$('.js-feedly-get').off("click").on("click", function (e) {

		$(this).hide();

		var t = $('#feedly_newer').val() || 0;

		var sendData = { type: 	"mysql_get_feedly_newer",
						 				 newer: t,
									 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-feedly-get').show();

			if ( result.status == 'Ok') {

				if (result.info) {
					// timer
					var div = document.createElement("div");
					div.textContent = result.timer;
					document.getElementById("container").appendChild(div);

					// feeds
					if (result.feeds.length>0) {

						show_data(document.getElementById("container"), result.feeds, '800px');

					}

					var br = document.createElement("br");
					document.getElementById("container").appendChild(br);

					// subscriptions
					if (result.info.subscriptions.length>0) {

						show_data(document.getElementById("container"), result.info.subscriptions, '800px');

					}

					var br = document.createElement("br");
					document.getElementById("container").appendChild(br);

					// counts
					if (result.info.counts.unreadcounts.length>0) {

						show_data(document.getElementById("container"), result.info.counts.unreadcounts, '400px');

					}

				}
			}

		});
	});

	$('.js-feedly-stream').off("click").on("click", function (e) {

		$(this).hide();

		var t = $('#feedly_stream').val() || '';

		var sendData = { type: 	"mysql_get_feedly_stream",
						 				 stream: t,
									 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-feedly-stream').show();

			if ( result.status == 'Ok') {

				var container = document.getElementById("container");
				if (result.stream) {
					var div = document.createElement("div");
					div.textContent = result.stream;
					container.appendChild(div);
				}
				if (result.info.title) {
					var div = document.createElement("div");
					div.textContent = result.info.title;
					container.appendChild(div);
				}
				var br = document.createElement("br");
				container.appendChild(br);

				// feeds
				if (result.feeds.length>0) {
					var div = document.createElement("div");
					div.textContent = 'count: '+result.feeds.length;
					container.appendChild(div);
					var br = document.createElement("br");
					container.appendChild(br);

					show_data(container, result.feeds, '800px');

				}
				var br = document.createElement("br");
				container.appendChild(br);

				if (result.info.items.length>0) {

					show_data(container, result.info.items, '800px');

				}

			}

		});
	});

	$('.js-rss-get').off("click").on("click", function (e) {

		$(this).hide();

		var sendData = { type: 	"mysql_get_rss_all",					 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-rss-get').show();

			if ( result.status == 'Ok') {

				// list_rss
				if (result.list_rss.length>0) {

					show_data(document.getElementById("container"), result.list_rss, '400px');

				}

				var br = document.createElement("br");
				document.getElementById("container").appendChild(br);

				// feeds
				if (result.feeds.length>0) {

					show_data(document.getElementById("container"), result.feeds, '800px');
				}

			}

		});
	});

	$('.js-rss-url').off("click").on("click", function (e) {

		$(this).hide();

		var t = $('#rss_url').val() || '';

		var sendData = { type: 	"mysql_get_rss_url",		url: 	t		 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-rss-url').show();

			if ( result.status == 'Ok') {

				var container = document.getElementById("container");
				if (result.url) {
					var div = document.createElement("div");
					div.textContent = result.url;
					container.appendChild(div);
				}
				var br = document.createElement("br");
				container.appendChild(br);

				// feeds
				if (result.feeds.length>0) {
					var div = document.createElement("div");
					div.textContent = 'count: '+result.feeds.length;
					container.appendChild(div);
					var br = document.createElement("br");
					container.appendChild(br);

					show_data(container, result.feeds, '800px');

				}
				var br = document.createElement("br");
				container.appendChild(br);

				if (result.info.length>0) {

					show_data(container, result.info, '800px');

				}

			}

		});
	});

	$('.js-twitter-get').off("click").on("click", function (e) {

		$(this).hide();

		var t = $('#twitter_newer').val() || 0;

		var sendData = { type: 	"mysql_get_twitter_newer",
						 				 newer: t,
									 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-twitter-get').show();

			if ( result.status == 'Ok') {

				// list_twitter
				if (result.list_twitter.length>0) {

					show_data(document.getElementById("container"), result.list_twitter, '400px');

				}

				var br = document.createElement("br");
				document.getElementById("container").appendChild(br);

				// feeds
				if (result.feeds.length>0) {

					show_data(document.getElementById("container"), result.feeds, '800px');

				}

			}

		});
	});

	$('.js-twitter-token').off("click").on("click", function (e) {

		$(this).hide();

		var t = $('#twitter_token').val() || '';

		var sendData = { type: 	"mysql_get_twitter_token",
						 				 token: t,
									 };

		Request.save(sendData, function(result) {

			console.log(result);
			$("#container").empty();

			$('.js-twitter-token').show();

			if ( result.status == 'Ok') {

				var container = document.getElementById("container");
				if (result.token) {
					var div = document.createElement("div");
					div.textContent = result.token;
					container.appendChild(div);
				}
				var br = document.createElement("br");
				container.appendChild(br);

				// feeds
				if (result.feeds.length>0) {
					var div = document.createElement("div");
					div.textContent = 'count: '+result.feeds.length;
					container.appendChild(div);
					var br = document.createElement("br");
					container.appendChild(br);

					show_data(container, result.feeds, '800px');

				}
				var br = document.createElement("br");
				container.appendChild(br);

				if (result.twitter.length>0) {

					show_data(container, result.twitter, '800px');

				}

			}

		});
	});

	$('.js-regulation-run').off("click").on("click", function (e) {

		var id = $('#regulation_feed_id').val();
		if (!id) 	return;

		$(this).hide();

		var sendData = { type: 	"mysql_run_regulation",
										 feed_id: id,
									 };

		Request.save(sendData, function(result) {

			console.log(result);

			if (result.texts.length>0) {
				var table = document.createElement("table");
				table.setAttribute("border", "1");
				document.getElementById("container").appendChild(table);
				var tbody = document.createElement("tbody");
				table.appendChild(tbody);

				var tr = document.createElement("tr");
				tbody.appendChild(tr);

				for (var i=0; i<result.texts.length; i++) {
					var tr = document.createElement("tr");
					tbody.appendChild(tr);
					var td = document.createElement("td");
					td.textContent = result.texts[i].log;
					tr.appendChild(td);

				}
			}

			$('.js-regulation-run').show();

		});
	});

};




// -----------------------------------------------------------------------------
