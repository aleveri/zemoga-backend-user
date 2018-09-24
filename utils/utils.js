var request = require("request");

var Utils = {};

Utils.updateUser = function (user, id) {
  try {
    var options = {
      method: 'POST',
      url: 'https://contarerpdev.au.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"blxLQ33x9toifBLD655M6aqoHeUCRnYg","client_secret":"Sv4F7acbjg7qn3aeAii9ETwVH-Bzfal3K14rqFzCFLyTnzFZD65OqplLhURlFPBG","audience":"https://contarerpdev.au.auth0.com/api/v2/","grant_type":"client_credentials"}'
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var token = JSON.parse(response.body);
      options = {
        method: 'PATCH',
        url: 'https://contarerpdev.au.auth0.com/api/v2/users/' + id,
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        },
        body: JSON.stringify(user)
      };
      request(options, function (error, response2, body2) {
        if (error) throw new Error(error);
        return;
      });
    });
  } catch (error) {
    return error;
  }
};

module.exports = Utils;