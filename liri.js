var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js').twitterKeys;

var action = process.argv[2];
var arg = process.argv[3];


var getTweets = function getTweets() {
  twitter(keys).get('statuses/user_timeline', 'count=20', function(error, tweets, response) {
    // console.log last 20 tweets and when they were created
    if (error) {
      console.log('Couldn\'t access your tweets!');
    } else {
      tweets.forEach(function(tweet) {
        console.log(tweet.created_at + ": " + tweet.text);
      });
    }
  });
}

var getSong = function getSong(song) {
  if (song === undefined) {
      song = "The Sign";
  }
  spotify.search({type: 'track', query: song }, function(error, response) {
    if (error) {
      console.log('There was an issue finding that song', error);
    } else {
      // console.log(response);
      response.tracks.items.forEach(function(song) {
        console.log('Song name:', song.name);
        console.log('Artist:', song.album.artists[0].name);
        console.log('Spotify preview URL:', song.preview_url);
        console.log('Album:', song.album.name);
        console.log('---');
      });
    }
  });
}

var getMovie = function getMovie(movie) {
  if (movie === undefined) {
    movie = "Mr. Nobody";
  }
  
  var qUrl = 'http://www.omdbapi.com/?t=' + movie;
  request(qUrl, function(error, response, body) {
    if (error) {
      console.log('There was an issue finding that movie', error);
    } else {
      flick = JSON.parse(body);
      console.log('Title:', flick.Title);
      console.log('Released:', flick.Year);
      console.log('IMDB rating:', flick.Ratings[0].Value);
      console.log('Country of origin:', flick.Country);
      console.log('Language:', flick.Language);
      console.log('Plot', flick.Plot);
      console.log('Actors:', flick.Actors);
      console.log('Rotten Tomatoes rating:', flick.Ratings[1].Value);
    }
  });
}

var doThing = function doThing() {
  // get arguments from random.text
  var randAction, randArgument;
  fs.readFile('./random.txt', 'utf-8', function(error, data) {
    var arr = data.split(',');
    randAction = arr[0];
    randArgument = arr[1];
    actions[randAction](randArgument);
  });
}

var actions = {
  'my-tweets': getTweets,
  'spotify-this-song': getSong,
  'movie-this': getMovie,
  'do-what-it-says': doThing 
}

actions[action](arg);