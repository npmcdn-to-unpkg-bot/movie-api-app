#MovieDatabase App that connects to Open Movie DB API with jQuery .getJSON method - AJAX!!
###Using AJAX (jQuery's $.getJSON method see the line literally above me) this app pulls from an endpoint provided by themoviedb.org and serves up now playing movies on load. Gives the user the option of searching for a movie and will change the HTML to reflect the new posters.
###Add on: Used Typeahead jQuery plugin, select dropdown options (actor, movie, etc.), modal with summary info. 
###See http://docs.themoviedb.apiary.io/ for api information
###Call Michael Bay for upcoming movie information.
####Configured URL  with API Key and set to variables 
jQuery will make GET request here on load
```js
	var imagePath;
	//The URL of all our API calls
	var baseURL = 'https://api.themoviedb.org/3/';
	//The query string including apiKey anytime they ask for it
	var apiKey = '?api_key=	5e2170b9fb801a61d6d784870c4c2eb1';
	//The configURL so that we can get basic config data
	var configURL = baseURL + 'configuration' + apiKey;
	```
	#### Ran AJAX .getJSON method to receive "configData" from API
	```js
		//Make an AJAX call to the config URL.
	$.getJSON(configURL, function(configData){
		console.log(configData);
		//Set our global var imagePath to the result of our AJAX call
		imagePath = configData.images.base_url;
	});
```
####Ran AJAX call for "now_playing" results, looped through the data, and injected Data as new HTML
```js
		//Now Playing is default on page load. Set up the URL
	var nowPlaying = baseURL + 'movie/now_playing' + apiKey;
	//Make an AJAX call to the now playing URL.
	$.getJSON(nowPlaying, function(movieData){
		// console.log(movieData);
		var newHTML = '';
		//Loop through all the results and set up an image url.
		for(i=0; i<movieData.results.length; i++){
			var currentPoster = imagePath + 'w300' + movieData.results[i].poster_path;
			var genreName = ''; 
			// genreArray[firstGenreID];
			for(j=0; j<movieData.results[i].genre_ids.length; j++){
				var safeGenreName = genreArray[movieData.results[i].genre_ids[j]].replace(/ /g, "");
				// console.log(safeGenreName);
				genreName += safeGenreName + ' ';
			}
			newHTML += '<div class="col-sm-3 now-playing ' + genreName + '">';
			newHTML += '<img src="' + currentPoster + '">';
			newHTML += '</div>';
			// console.log(currentPoster);
		}
		$('#poster-grid').html(newHTML);

		getIsotope();
	});	
```
	


