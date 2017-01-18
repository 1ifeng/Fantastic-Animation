module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/login', require('./login'));
  app.use('/logout', require('./logout'));
  app.use('/posts', require('./posts'));
};
