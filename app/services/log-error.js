// Log error makes Node.js uncaughtException errors more readable

function logError(err, uncaughtException) {
  let error = err.stack.split("\n");
  let the_error = error[0];
  let error_line = error[1];
  error_line = error_line.split("/");
  error_line = error_line[error_line.length-1];
  error_line = error_line.replace(")", "");
  if (uncaughtException)
    console.log(`uncaughtException!\n${the_error}\nat: ${error_line}`);
  else
    console.log(`${the_error} - ${error_line}`);
}

module.exports = logError;
