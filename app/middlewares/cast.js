// Cast is made to print the response of any API request
// (Cast wrapped by function in order to have an access for express's res)

module.exports = function(req, res, next) {

  class Cast {

    constructor(res) {
      this.res = res;
      this.OK = true;
      this.status; this.name; this.message; this.flags; this.data;
    }

    unAuthorized(info) {
      if (!info) info = {};
      this.status = info.status || 401;
      this.name = info.name || "Unauthorized";
      this.message = info.message || "Authentication token not found / incorrect";
      this.flags = info.flags;
      this.print();
    }

    forbidden(info) {
      if (!info) info = {};
      this.status = info.status || 403;
      this.name = info.name || "Forbidden";
      this.message = info.message || "You do not have the right permission to perform this action";
      this.flags = info.flags;
      this.print();
    }

    badRequest(info) {
      if (!info) info = {};
      this.status = info.status || 400;
      this.name = info.name || "Bad Request";
      this.message = info.message || "The request could not be processed / understood by the server";
      this.flags = info.flags;
      this.print();
    }

    uriTooLong(info) {
      if (!info) info = {};
      this.status = info.status || 414;
      this.name = info.name || "Request-URI Too Long";
      this.message = info.message || "The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.";
      this.flags = info.flags;
      this.print();
    }

    tooMany(info) {
      if (!info) info = {};
      this.status = info.status || 429;
      this.name = info.name || "Too Many Requests";
      this.message = info.message || "You have sent too many requests in a given amount of time";
      this.flags = info.flags;
      this.print();
    }

    notFound(info) {
      if (!info) info = {};
      this.status = info.status || 404;
      this.name = info.name || "Not Found";
      this.message = info.message || "The requested URL is not found";
      this.flags = info.flags;
      this.print();
    }

    badInput(info) {
      if (!info) info = {};
      this.status = info.status || 400;
      this.name = info.name || "Bad Input";
      this.message = info.message || "One or more of the required filled are not filled properly";
      this.flags = info.flags;
      this.print();
    }

    serverError(info) {
      if (!info) info = {};
      this.status = info.status || 500;
      this.name = info.name || "Internal Server Error";
      this.message = info.message || "The server encountered an unexpected condition which prevented it from fulfilling the request";
      this.flags = info.flags;
      this.print();
    }

    error(info) {
      if (!info) info = {};
      this.status = info.status || 400;
      this.name = info.name || "Error";
      this.message = info.message || "Something went wrong";
      this.flags = info.flags;
      this.print();
    }

    // Success responses

    ok(info) {
      if (!info) info = {};
      this.status = info.status || 200;
      this.data = info.data || {};
      this.print();
    }

    created(info) {
      if (!info) info = {};
      this.status = info.status || 201;
      this.data = info.data || {};
      this.print();
    }

    noContent(info) {
      if (!info) info = {};
      this.status = info.status || 204;
      this.data = info.data || {};
      this.print();
    }

    print() {
      let print_payload = { OK: this.OK };
      if (this.status>299) {
        this.OK = false;
        print_payload["error"] = {
          name: this.name,
          message: this.message,
          flags: this.flags,
          code: this.status
        };
      } else {
        print_payload["data"] = this.data;
      }
      print_payload.OK = this.OK;
      this.res.status(this.status || 500).json(print_payload);
    }

  }

  cast = new Cast(res);
  next();

}
