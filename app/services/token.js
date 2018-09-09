// Verifing authentication token sent by the client in the headers

// should be named: token
// should have methods: validate, sign

module.exports = {
  validate: function() {
    return function(req, res, next) {

      // validate
      // verify

      function isTokenExists() {
        let result = {};
        try {
          let authorization = req.headers.authorization;
          if (!authorization) return cast.unAuthorized();
          result.authorization = authorization;
          return verifyTheToken(result);
        }
        catch(err) { return cast.error(err); }
      }

      function verifyTheToken(result) {
        jwt.verify(result.authorization, process.env.JWT_SECRET, function(err, decoded) {
          if (err) return cast.unAuthorized({message: err.message});
          if (decoded) {
            req.params.decoded = decoded;
            next();
          }
        });
      }

      isTokenExists();

    }
  },
  sign: function(payload) {
    return new Promise(function(resolve, reject) {
      jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60}, function(err, auth_token) {
        if (err) return reject(err);
        return resolve(auth_token);
      });
    });
  }
};
