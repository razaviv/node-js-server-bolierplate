const schema = Joi.object().keys({
  status: Joi.string(), // active / pending / disabled
  code: Joi.number(),
  name: Joi.string(),
  address: Joi.object().keys({
    city: Joi.string(),
    street: Joi.string(),
    house_number: Joi.string()
  }),
  create_date: Joi.object().keys({
    timestamp: Joi.timestamp(),
    date: Joi.string()
  }),
  joined_date: Joi.object().keys({
    timestamp: Joi.timestamp(),
    date: Joi.string()
  }),
  drivers_amount: Joi.number(),
  vehicles_amount: Joi.number(),
  manager: Joi.object().keys({
    code: Joi.number(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string()
    secret_exchange_code: Joi.string()
  })
});

module.exports = schema;
