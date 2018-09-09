// Locale is a service retrieving a translation.json based on users region

module.exports = function(req, res, next) {

  try {
    let languageHeader = req.headers['accept-language'];
    if (!languageHeader) throw null;
    if (languageHeader.indexOf(".")!=-1 || languageHeader.indexOf("/")!=-1) throw null;
    if (languageHeader.indexOf(",")!=-1) languageHeader = languageHeader.split(",")[0];
    t = require('../locales/' + languageHeader + '/translations.json');
    next();
  } catch(err) {
    t = require('../locales/en-US/translations.json');
    next();
  }

}
