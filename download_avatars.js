
// 23e4e4461d4c7e50158276ad80149f381be4e389
var consoleInput = process.argv.slice(2);
// console.log(consoleInput);



if (consoleInput[1] === false) {
  console.log('Not enough inputs!');
}




var token = require('./secrets.js');

var request = require('request');

var fs = require('fs');





console.log('Welcome to the GitHub Avatar Downloader!');





function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'mattrkelly27',
      'Authorization': 'token ' + token.GITHUB_TOKEN,
    },
  };



  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
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
       .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}



getRepoContributors(consoleInput[0], consoleInput[1], function(err, contributors) {

  for (var i = 0; i < contributors.length; i++) {

    downloadImageByURL(contributors[i].avatar_url,  contributors[i].login);

  }

})


