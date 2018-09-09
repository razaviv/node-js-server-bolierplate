module.exports = function(req, res, next) {

  function validate_user_input() {
    let result = {};
    let flags = {};
    try {
      if (!req.params) flags.general = t['Parameters are not found'];
      if (req.params && !req.params.phone) flags.phone = t['Please enter phone number'];
      if (req.params && req.params.phone && req.params.phone.length!=10) flags.phone = t['Please enter phone number'];
      if (Object.keys(flags).length>0) return cast.badRequest({flags});
      return checkIfPhoneIsValid(result);
    } catch(err) {
      return cast.error(err);
    }
  }

  function checkIfPhoneIsValid(result) {
    var query = {
      "personal_info.phone": req.params.phone
    };
    let limitFields = {
      personal_info: true,
      status: true,
      request_limiter: true
    };
    db.users.findOne(query, limitFields, function(err, docs) {
      if (err) return cast.error(err);
      let flags = {};
      if (docs) {
        if (docs.status!="active") flags.general = t['The user status is not active / suspended'];
        if (Object.keys(flags).length>0) return cast.forbidden({flags});
        if (docs.request_limiter && docs.request_limiter.sms) {
          let last_request = docs.request_limiter.sms.last_request;
          let gap = (new Date().getTime()-last_request)/1000;
          gap = Math.round(gap*100)/100;
          if (gap<process.env.RESET_PASS_GAP) {
            flags.general = t['Verification code was already sent moments ago'] + ". ";
            flags.general += t['Try again in'] + " ";
            flags.general += parseInt(process.env.RESET_PASS_GAP-gap) + ' ' + t['Seconds'];
          }
          if (Object.keys(flags).length>0) return cast.tooMany({flags});
        }
        result.user = docs;
        return updateRequestLimiter(result);
      } else {
        flags.general = t['User was not found'];
        return cast.forbidden({flags});
      }
    });
  }

  function updateRequestLimiter(result) {
    result.temporary_code = (Math.floor(1000 + Math.random() * 9000)).toString();
    let query = {
      "_id": ObjectId(result.user._id)
    };
    let newValues = {
      $set: {
        "request_limiter.sms.last_request": new Date().getTime(),
        "request_limiter.sms.code": result.temporary_code // 4 digits temp code
      }
    };
    db.users.update(query, newValues, function(err, docs) {
      if (err) return cast.error(err);
      return sendTheNewVerificationCodeViaSMS(result);
    });
  }

  function sendTheNewVerificationCodeViaSMS(result) {
    let new_code = t['Your temporary code is'] + ": " + result.temporary_code;
    sms(result.user.personal_info.phone, new_code).then(response => {
      return cast.ok({
        data: {
          userId: result.user._id
        }
      });
    }).catch(error => {
      return cast.error(error);
    });
  }

  validate_user_input();

}
