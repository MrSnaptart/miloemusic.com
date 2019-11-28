(function($){
	$(function(){
		
	function validURL(str) {
	  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	  return !!pattern.test(str);
	}

	// $('.sidenav').sidenav();
	// $('.parallax').parallax();

	// $(window).resize(function(){
	// 	$('.parallax').parallax();
	// });

	// GOOGLE CALENDAR API

	var calID = "the.miloemusic@gmail.com";
	var https = "https://www.googleapis.com/calendar/v3/calendars/" + calID + "/events";
	var apiKey = "AIzaSyC-jdi3_sjRNpxo14T4UunwC99xkUTFliU";

	// date, location, venue, time
	shows = [];

	$.ajax({
		url: https,
		data: {
			"key": apiKey,

			// Rule out previous events
			"timeMin": (new Date()).toISOString(),
			"orderBy": "startTime",
			"singleEvents": true
		}
	}).done(function(data) {

		console.log(data);

		for(i in data.items) {

			// Location
			try {
				var lctn = data.items[i].location.split('\n')[0];
			}
			catch(err) {
				console.log(err.message);
				var lctn = "Location TBA";
			}
			
			var mdate = moment(data.items[i].start.dateTime).format('ddd MMM D, YYYY');
			
			var mtime = moment(data.items[i].start.dateTime).format('ha');
		
			// Acts
			var acts = data.items[i].summary;

			// Date
			var date = data.items[i].start.dateTime.slice(5, 10).replace('-', '/');
			if(date[3] == 0)
				date = date[0] + date[1] + date[2] + date[4];

			// Time
			var time = data.items[i].start.dateTime.slice(11, 16);
			var hour = time.slice(0, 2);
			hour = hour[0] != 0 ? hour : hour[1];
			var mins = time.slice(3, 5);
			mins = mins != 0 ? ":" + mins : "";

			if(hour > 12) {
				time = (hour - 12) + mins + "pm";
			}
			else {
				time = hour.toString() + mins + "am";
			}

			// shows.push(date +  " " + lctn + " w/ " + acts + " " + time);
			
			// hope this worjs
				
			var link = data.items[i].description;

			if(!validURL(link))
				link = "https://www.instagram.com/miloemusic";
		

			$("#shows").append(
				'<div class="row">' + 
					'<div class="col s6 right-align mdate"><h6>' + mdate + '</h6></div>' + 
					'<div class="col s6 left-align mdate"><h6>' + mtime + '</h6></div>' + 
				
					'<div class="col s6 right-align"><h6>' + '<a href="'+link+'" class="venue-link">'+lctn + '</a></h6></div>' +
					'<div class="col s6 left-align"><h6>w/ ' + acts + '</h6></div>' +
				'</div>');


			/*<div class="row" >
				<div class="col s1 offset-s1"><h6>2/14</h6></div>
				<div class="col s3"><h6>First Avenue and 7th Street Entry</h6></div>
				<div class="col s5"><h6>w/ The Suburbs, and DJ Rudh</h6></div>
				<div class="col s1"><h6>6pm</h6></div>
			</div>*/
		}
	});
	
	// VIDEO PLAYER
	
	$(".arrow-right").bind("click", function (event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "+=336"
        }, 750);
    });
    $(".arrow-left").bind("click", function (event) {
        event.preventDefault();
        $(".vid-list-container").stop().animate({
            scrollLeft: "-=336"
        }, 750);
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
