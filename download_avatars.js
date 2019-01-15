
var consoleInput = process.argv.slice(2); //input from command line


if (consoleInput[1] === undefined)
  return console.log('Not enough inputs!');


var token = require('./secrets.js'); //requiring git token from secrets.js

var request = require('request');  //requiring request

var fs = require('fs');  //requiring fs


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'mattrkelly27',                     //my github username
      'Authorization': 'token ' + token.GITHUB_TOKEN,  //token.GITHUB_TOKEN -- from secrets.js
    },
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);    //turning the JSON string into an array of objects
    cb(err, data);  // callback the array of objects
  });

}

function downloadImageByURL(url, filePath) {

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         // console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));  //prints .jpg pictures to the avatars file
}


getRepoContributors(consoleInput[0], consoleInput[1], function(err, contributors) {
  for (var i = 0; i < contributors.length; i++) {
    downloadImageByURL(contributors[i].avatar_url,  contributors[i].login);  // gets the avatar url and login name from each object

  }

})


