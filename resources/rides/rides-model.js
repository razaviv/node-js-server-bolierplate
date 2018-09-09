const schema = {
  insert: Joi.object().keys({
    from: Joi.any(),
    destination: Joi.any(),
    vehicle: Joi.any(),
    date: Joi.any()
  }),
  update: Joi.object().keys({
    vehicle: Joi.any()
  })
};

module.exports = schema;
