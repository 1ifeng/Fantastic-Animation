var superagent = require('superagent');

module.exports = function search (query, fn) {
  superagent.get('http://search.twitter.com/search.json')
  .data({q: query})
  .end(function(res) {
    if (res.body && Array.isArray(res.body.results)) {
      return fn(null, res.body.results);
    }
    fn(new Error('Bad twitter response'));
  });
};
