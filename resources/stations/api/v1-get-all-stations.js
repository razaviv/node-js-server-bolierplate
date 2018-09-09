module.exports = function(req, res, next) {

  function find_filter() {
    let result = {};
    try {
      result.filter = JSON.parse(req.query.filter);
      return validate_and_set_filter(result);
    } catch(err) {
      return cast.badRequest({message: t['Filter was not filled properly']});
    }
  }

  function validate_and_set_filter(result) {
    try {
      if (!result.filter) {
        result.filter = {
          page: 0,
          limit: process.env.LIMIT,
          sort: {
            date: 1
          }
        };
        return select_stations(result);
      }
      if (result.filter) {
        if (!result.filter.page) result.filter.page = 0;
        if (!result.filter.limit) result.filter.limit = process.env.LIMIT;
        if (!result.filter.sort) {
          result.filter.sort = {
            date: 1
          };
        }
        if (result.filter.page<0 || isNaN(result.filter.page)) result.filter.page = 0;
        if (result.filter.limit<0 || isNaN(result.filter.limit)) result.filter.limit = process.env.LIMIT;
        if (result.filter.sort && result.filter.sort.date && (result.filter.sort.date!=1 || result.filter.sort.date!=-1))
          resut.filter.sort.date = 1;
      }
      return select_stations(result);
    } catch(err) {

    }
  }

  function select_stations(result) {
    var query = {

    };
    db.stations.find(query).sort({joined_date.timestamp: result.filter.sort.date}).function(err, docs) {
      if (docs) {

      }
    });
  }

  find_filter();

}
