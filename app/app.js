// core modules
var config     = require('./config');
var app        = require('express')();
var server     = require('http').createServer(app);
var cluster    = require('cluster');
var cors       = require('cors')

if (cluster.isMaster) { require('./services/master')(cluster) } else {

  // core dependencies
  require('./services/dependencies')(server);

  // cast middleware
  app.use(require('./middlewares/cast'));

  // core middlewares
  app.set('json spaces', 4);
  app.use(require('helmet')());
  app.use(cors());
  app.use(require('body-parser').json()); // for parsing application/json
  app.use(require('body-parser').urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // locale middleware
  app.use(require('./middlewares/locale-init'));

  // versioning and URI sanitizing middleware
  app.use(require('./middlewares/versioning'));

  // router middleware
  app.use(require('./middlewares/router')(app));

  // fatal errors middlware
  app.use(require('./middlewares/errors'));

  // server run
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Connected and listening on port ${process.env.PORT || 3000}`);
  });

}
