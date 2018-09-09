module.exports = function(req, res, next) {

  var query = {
    "_id": ObjectId(req.params.decoded._id)
  };
  let limitFields = {
    personal_info: true,
    station: true,
    code: true,
    status: true,
    type: true,
    permissions: true
  };
  db.users.findOne(query, function(err, docs) {
    if (err) return cast.error(err);
    if (docs) {
      let flags = {};
      if (docs.status!="active") flags.general = t['The user status is not active / suspended'];
      if (Object.keys(flags).length>0) return cast.unAuthorized({flags});
      docs.auth_token = req.headers.authorization;
      return cast.ok({
        data: {
          user: docs
        }
      });
    } else {
      return cast.unAuthorized();
    }
  });

}
