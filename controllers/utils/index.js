const { phishKey } = require('../../config/keys');
const _ = require('lodash');

exports.options = (url, qs) => {
  qs = qs || {};
  var obj = {
    uri: `https://api.phish.net/v3${url}`,
    qs: { apikey: phishKey },
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }
  _.assign(obj.qs, qs);

  return obj;
};

exports.currentYear = (new Date()).getFullYear();