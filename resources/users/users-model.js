const schema = Joi.object().keys({
  status: Joi.string(), // "active" / "pending" / "disabled",
  code: Joi.number(),
  station: Joi.object().keys({
    code: Joi.number(),
    name: Joi.string()
  }),
  type: Joi.string(), // "passenger" / "driver" / "usher" / "manager" / "admin"

  personal_info: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string(),
    password: Joi.string(),
    subPhone: Joi.string(),
    "ID": Joi.string(),
    address: Joi.object().keys({
      city: Joi.string(),
      street: Joi.string(),
      house_number: Joi.string()
    }),
    birthday: Joi.object().keys({
      timestamp: Joi.timestamp(),
      date: Joi.string()
    }),
    nickname: Joi.string()
  }),

  // for passengers
  passenger_type: Joi.string(), // "private" / "employee"
  company: Joi.object().keys({
    code: Joi.number(),
    name: Joi.string(),
    department: Joi.string()
  }),

  // for drivers, ushers and managers (team)
  driver_type: Joi.string(),
  current_vehicle: Joi.object().keys({
    code: Joi.number(),
    license_plate: Joi.string(),
    begin_date: Joi.object().keys({
      timestamp: Joi.timestamp()
      date: Joi.string(),
      time: Joi.string()
    }),
    end_date: Joi.object().keys({
      timestamp: Joi.timestamp()
      date: Joi.string(),
      time: Joi.string()
    })
  }),
  vacations_amount: Joi.number(),
  rating: Joi.object().keys({
    votes: Joi.number(),
    positive: Joi.number(),
    reputation: Joi.number(), // % of positive feedbacks
  }),
  documents: Joi.array().items(Joi.object().keys({
    title: Joi.string(),
    period: Joi.object().keys({
      begin_date: Joi.object().keys({
        timestamp: Joi.timestamp()
        date: Joi.string(),
        time: Joi.string()
      }),
      end_date: Joi.object().keys({
        timestamp: Joi.timestamp()
        date: Joi.string(),
        time: Joi.string()
      })
    }),
    files: Joi.array().items(Joi.object().keys({
      title: Joi.string(),
      path: Joi.string()
    }))
  })),
  license: Joi.object().keys({
    group: Joi.string(),
    id: Joi.string(),
  }),
  branch: Joi.object().keys({
    code: Joi.number(),
    title: Joi.string()
  }),
  permission_level: Joi.number() // 0 is top permission

  request_limiter: Joi.object().keys({
    sms: Joi.object().keys({
      last_request: Joi.timestamp()
    })
  })

});

module.exports = schema;
