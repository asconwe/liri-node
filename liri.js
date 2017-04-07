var fs = require('fs');
var request = require('request');
var keys = require('./keys.js').twitterKeys;

var action = process.argv[2];
var arg = process.argv[3]

var getTweets = function getTweets() {
  var qUrl = '' // Make this URL from twitter keys
  request(qUrl, function(error, response, body) {
    // console.log last 20 tweets and when they were created
    if (error) {
      console.log('There was an issue getting your tweeets', error);
    }
  });
}

var getSong = function getSong(song) {
  if (song === undefined) {
      song = "The Sign";
  }
  var qUrl = '' // Make this URL from spotify api and song to search
  request(qUrl, function(error, response, body) {
    if (error) {
      console.log('There was an issue finding that song', error);
    }
  });
}

var getMovie = function getMovie(movie) {
  if (movie === undefined) {
    movie = "Mr. Nobody";
  }
  var qUrl = '' // Make this URL from omdb api and movie to search
  request(qUrl, function(error, response, body) {
    if (error) {
      console.log('There was an issue finding that movie', error);
    }
  });
}

var doThing = function doThing() {
  // get arguments from random.text
  var randAction, randArgument;
  fs.readFile('random.txt', function(error, data) {
    randAction = data[0];
    randArgument = data[1];
  });
  actions[randAction](randArgument);
}

var actions = {
  'my-tweets': getTweets,
  'spotify-this-song': getSong,
  'movie-this': getMovie,
  'do-what-it-says': doThing 
}

actions[action](argument);

