module.exports = function(err, req, res, next) {

  if(err instanceof SyntaxError) {
    console.log(err);
    return cast.serverError({flags: {name: "Syntax error", message: err.message}});
  }
  if(err instanceof RangeError) {
    console.log(err);
    return cast.serverError({flags: {name: "Range error", message: err.message}});
  }
  if(err instanceof ReferenceError) {
    console.log(err);
    return cast.serverError({flags: {name: "Reference error", message: err.message}});
  }
  if(err instanceof TypeError) {
    console.log(err);
    return cast.serverError({flags: {name: "Type error", message: err.message}});
  }
  if(err instanceof URIError) {
    console.log(err);
    return cast.serverError({flags: {name: "URI error", message: err.message}});
  }

  next();

}
