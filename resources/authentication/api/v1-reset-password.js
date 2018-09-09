module.exports = function(req, res, next) {

  function validate_sms_code() {
    let result = {};
    let flags = {};
    if (!req.body) flags.general = t['Parameters are not found'];
    if (req.body) {
      if (!req.body.userId) flags.general = t['User ID is missing'];
      if (!req.body.code) flags.code = t['Verification code was not found'];
      if (!req.body.password) flags.password = t['Password was not found'];
      if (req.body.password && (req.body.password.length<7 || req.body.password.length>20)) flags.password = t['Invalid password format'];
      if (!req.body.password_repeat) flags.password_repeat = t['Repeat password was not found'];
      if (req.body.password_repeat && req.body.password_repeat!=req.body.password) flags.password_repeat = t['Passwords not match'];
      if (Object.keys(flags).length>0) return cast.badRequest({flags});
      return validate_request(result);
    }
  }

  function validate_request(result) {
    let schema = Joi.object().keys({
      userId: Joi.string(),
      code: Joi.string(),
      password: Joi.string(),
      password_repeat: Joi.string()
    });
    Joi.validate(req.body, schema, { abortEarly: false }, err => {
      if (err) return cast.badRequest({message: err.message});
      return verify_sms(result);
    });
  }

  function verify_sms(result) {

    var query = {
      "_id": ObjectId(req.body.userId),
      "request_limiter.sms.code": req.body.code
    };
    db.users.findOne(query, function(err, docs) {
      if (err) return cast.error(err);
      if (docs) {
        let gap = (new Date().getTime()-docs.request_limiter.sms.last_request)/1000;
        gap = Math.round(gap*100)/100;
        if (gap>process.env.RESET_PASS_GAP) return cast.badRequest({flags: {code: t['Verification code was expired']}});
        return setNewPassword(result);
      } else {
        return cast.forbidden({flags: {code: t['Verification code is incorrect']}});
      }
    });

    function setNewPassword(result) {

      let query = {
        "_id": ObjectId(req.body.userId)
      };
      let newValues = {
        $set: {
          "personal_info.password": req.body.password
        },
        $unset: {
          "request_limiter": ""
        }
      };
      let limitFields = {
        personal_info: true,
        station: true,
        code: true,
        status: true ,
        type: true,
        permissions: true
      };
      db.users.findAndModify({query: query, update: newValues, new: true}, function(err, docs) {
        if (err) return cast.error(err);
        let payload = {
          "_id": docs._id,
          timestamp: new Date().getTime()
        };
        token.sign(payload).then(auth_token => {
          return cast.ok({
            data: {
              user: docs,
              auth_token
            }
          });
        }).catch(error => {
          if (error) return cast.error(error);
        });
      });

    }

  }

  validate_sms_code();

}
