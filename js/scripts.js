
$(document).ready(function(){
	
	var imagePath;
	//The URL of all our API calls
	var baseURL = 'https://api.themoviedb.org/3/';
	//The query string including apiKey anytime they ask for it
	var apiKey = '?api_key=5e2170b9fb801a61d6d784870c4c2eb1';
	//The configURL so that we can get basic config data
	var configURL = baseURL + 'configuration' + apiKey;


	

	//Make an AJAX call to the config URL.
	$.getJSON(configURL, function(configData){
		//Set our global var imagePath to the result of our AJAX call
		imagePath = configData.images.base_url;
	});

	//Now Playing is default on page load. Set up the URL
	var nowPlaying = baseURL + 'movie/now_playing' + apiKey;
	console.log(nowPlaying);

	//Make an AJAX call to the now playing URL.

	$.getJSON(nowPlaying, function(movieData){
		var newHTML = '';
		//Loop through all the results and set up an image url.
		for(i=0; i<movieData.results.length; i++){
			var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
			newHTML += '<div class="col-sm-3">';
			newHTML += '<img src="' + currentPoster + '">';
			newHTML += '</div>';
			// console.log(currentPoster);	
		}

		for(i=0; i<movieData.results.length; i++){
			var titleArray = [];
			titleArray.push(movieData.results[i].title);
			console.log(titleArray);
		}
		
		var substringMatcher = function(strs) {
		  return function findMatches(q, cb) {
		    var matches, substringRegex;
		    matches = [];
		    substrRegex = new RegExp(q, 'i');

		    $.each(strs, function(i, str) {
		      if (substrRegex.test(str)) {
		       		matches.push(str);
		     	}
		    });
		    cb(matches);
		  };
		};

		$('#the-basics .typeahead').typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'states',
		  source: substringMatcher(titleArray)
		});


		$('#poster-grid').html(newHTML);
	});

	$("#movie-search-form").submit(function() {
	 	event.preventDefault();
	 	var input = $("#movie-input").val();
	 	var searchURL = baseURL + "search/multi" + apiKey + "&query=" + encodeURI(input);
	 	// console.log(searchURL);
		 $.getJSON(searchURL, function(searchResult){
		 	var newHTML = '';
		 	 	for(var i= 0; i < searchResult.results.length; i++){
				var poster = imagePath + "w300" + searchResult.results[i].poster_path;
					newHTML += "<div class='col-sm-3'>";
					newHTML += "<img src='" + poster + "'>";
					newHTML += "</div>";
				}
				$("#poster-grid").html(newHTML);
			});
	 	});
});

