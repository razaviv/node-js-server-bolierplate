// Sanitize bad URI requests and define the version of the requested API

module.exports = function(req, res, next) {

  try {
    if (req.url.length>300) cast.uriTooLong();
    if (req.url.indexOf(".")!=-1) cast.badRequest({message: "Bad URI structure"});
    let version = req.url.split('/')[1];
    if (version.length>7) cast.uriTooLong({name: "Request-Version too long", message: "The server is refusing to service the request because the Request-Version is longer than the server is willing to interpret."});
    let pat = /[v][0-9]+/g;
    if (!version.match(pat)) {
      req.url = "/" + process.env.API_CURRENT_VERSION + req.url;
    }
  } catch(err) { cast.error(err); }

  try {
    if (req.query) {
      req.query = JSON.parse(req.query);
    }
    next();
  } catch(err) {
    next();
  }

}
