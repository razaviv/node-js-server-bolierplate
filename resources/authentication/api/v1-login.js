module.exports = function(req, res, next) {

  function validate_user_input() {
    let result = {};
    let flags = {};
    if (!req.body) flags.general = t['Parameters are not found'];
    if (req.body) {
      if (!req.body.phone) flags.phone = t["Please fill your account phone number"];
      if (!req.body.password) flags.password = t["Please fill your account password"];
      if (req.body.phone && req.body.phone.length!=10) flags.phone = t["Please fill your account phone number"]
      if (req.body.password && (req.body.password.length>20 || req.body.password.length==0) ) flags.password = t["Please fill your account password"];
    }
    if (Object.keys(flags).length>0) return cast.unAuthorized({flags});
    return dbVerify(result);
  }

  function dbVerify(result) {
    let query = {
      "personal_info.phone": req.body.phone,
      "personal_info.password": req.body.password
    };
    let limitFields = {
      personal_info: true,
      station: true,
      code: true,
      status: true,
      type: true,
      permissions: true
    };
    db.users.findOne(query, limitFields, function(err, docs) {
      if (err) return cast.error(err);
      let flags = {};
      if (docs==null) flags.general = t["Incorrect login details"];
      if (Object.keys(flags).length>0) return cast.unAuthorized({flags});
      result.user = docs;
      return createJwtToken(result);
    });
  }

  function createJwtToken(result) {
    let payload = {
      "_id": result.user._id,
      timestamp: new Date().getTime()
    };
    token.sign(payload).then(auth_token => {
      result.user.auth_token = auth_token;
      return cast.ok({
        data: {
          user: result.user
        }
      });
    }).catch(error => {
      return cast.error(error);
    });
  }

  validate_user_input();

}
