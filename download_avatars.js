
// 23e4e4461d4c7e50158276ad80149f381be4e389


var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {



  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'mattrkelly27',
      'Authorization': 'token 23e4e4461d4c7e50158276ad80149f381be4e389',
    },
  };


  request(options, function(err, res, body) {
    cb(err, body);
  });

}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
