module.exports = function(req, res, next) {

  // schemaTest()
  // validate_user_input()
  // insertRecord()

  var newValues = {
    firstName: "Itay",
    userType: "driver"
  };
  db.rides.insert(newValues, function(err, docs) {
    cast.ok();
  });

  // const schema = require('../rides-model');
  //
  // function schemaTest() {
  //   let result = {};
  //   Joi.validate(req.body, schema.insert, { abortEarly: false }, err => { if (err) return cast.badRequest({message: err.message}); return validate_user_input(result); });
  // }
  //
  // function validate_user_input(result) {
  //   let flags = {};
  //
  //   try {
  //     if (!req.body.from)
  //       flags.from = t["Origin city must be filled out"];
  //     if (req.body.from && (req.body.from.length<2 || req.body.from.length>35))
  //       flags.from = t["Origin city must be 2-35 chars long"];
  //
  //     if (!req.body.destination)
  //       flags.destination = t["Destination city must be filled out"];
  //     if (req.body.destination && (req.body.destination.length<2 || req.body.destination.length>35))
  //       flags.destination = t["Destination city must be 2-35 chars long"];
  //
  //     if (req.body.vehicle && (req.body.vehicle.length<1 || req.body.vehicle.length>15))
  //       flags.vehicle = t["Vehicle must be less than 15 chars long"];
  //   } catch(err) {
  //     return cast.badRequest({flags: {undefined: err.message}});
  //   }
  //
  //   if (Object.keys(flags).length>0)
  //     return cast.badRequest({flags});
  //   return insertRecord(result);
  // }
  //
  // function insertRecord(result) {
  //   db.rides.insert(req.body, function(err, docs) {
  //     if (err) return cast.error(err);
  //
  //     io.to("0509921014").emit("example", {
  //       message: "New item was created through the API"
  //     });
  //     return cast.created({data: docs});
  //
  //   });
  // }
  //
  // schemaTest();

}
