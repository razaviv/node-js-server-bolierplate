module.exports = function(app) {

  // Receive: phone + password, Send: users payload + permissions + auth token
  app.post("/v1/authentication/login", require('./api/v1-login'));

  // Validate authentication token
  app.post("/v1/authentication/verify-token", token.validate(), require('./api/v1-verify-token'));

  // Reset password with a SMS temporary code
  app.get("/v1/authentication/request-sms/:phone", require('./api/v1-request-sms'));

  // Validate SMS temporary code and create a new password
  app.post("/v1/authentication/reset-password", require('./api/v1-reset-password'));

}
