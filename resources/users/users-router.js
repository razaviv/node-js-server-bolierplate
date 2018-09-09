// GET user
// GET users
// SET user
// PUT user
// REMOVE user


module.exports = function(app) {

  // app.get("/v1/users/token", require('./api/v1-get-user-token'));

  app.use((req, res, next) => {
    cast.notFound();
  });

}
