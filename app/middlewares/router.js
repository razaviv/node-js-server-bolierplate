// The main router of the app - delivering tasks to mini routers (divisions)

function router(app) {
  return function(req, res, next) {

    const resourceList = ["authentication", "stations", "permissions"];
    for (let r of resourceList) {
      require(`../../resources/${r}/${r}-router`)(app);
    }
    next();

  }
}

module.exports = router;
