// ----------------------------------
// table of content
// ------------------------------------
//
// GET ride
// GET rides
// POST ride
// PUT ride
// DELETE ride
//
// ----------------------------------*/
// /*----------------------------------

module.exports = function(app) {

  // GET ride - select a ride
  app.get("/v1/rides/:id", token.validate(), require('./api/v1-get-ride'));

  // POST ride - insert a new ride
  app.post("/v1/rides", token.validate(), require('./api/v1-set-ride'));

}
