module.exports = function(req, res, next) {

  console.log("1");
  return cast.ok();
  
  function validate_user_input() {
    console.log("1");
    let result = {};
    try {
      if (!req.params) return cast.badRequest();
      if (req.params && !req.params.phone) return cast.badRequest({message: t['Please enter phone number']});
      if (req.params && req.params.phone && (req.params.phone.length==0 || req.params.phone.length>10) ) return cast.badRequest({message: t['Please enter phone number']});
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
      if (docs.status!="active") return cast.forbidden({message: t['The user status is not active / suspended']});
      if (docs.request_limiter && docs.request_limiter.sms) {
        let last_request docs.request_limiter.sms.last_request;
        let gap = new Date().timestamp-last_request;
        let seconds = gap/60;
        seconds = Math.round(seconds*100)/100;
        if (gap<300) return cast.tooMany({message: t['Try again in'] + ' ' + seconds + ' ' + t['Seconds']});
      }
      result.user = docs;
      return updateRequestLimiter(result);
    });
  }

  function updateRequestLimiter(result) {
    var query = {
      "_id": ObjectId(result.user._id)
    };
    let newValues = {
      $set: {
        "request_limiter.sms.last_request": new Date().time(),
        "request_limiter.sms.code": Math.floor(1000 + Math.random() * 9000) // 4 digits temp code
      }
    };
    db.users.update(query, newValues, function(err, docs) {
      if (err) return cast.error(err);
      return cast.ok();
    });
  }

  // validate_user_input();

}
