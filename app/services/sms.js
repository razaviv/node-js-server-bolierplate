module.exports = function(phone, message) {

  return new Promise(function(resolve, reject) {

    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };
    // Configure the request
    var options = {
      url: process.env.SMS_MASOF,
      method: 'POST',
      headers: headers,
      body: "\
          <?xml version='1.0' encoding='UTF-8'?>\
          <sms>\
            <user>\
              <username>" + process.env.SMS_USER + "</username>\
              <password>" + process.env.SMS_PASSWORD + "</password>\
            </user>\
            <source>Ride4you</source>\
            <destinations>\
              <phone>" + phone + "</phone>\
            </destinations>\
            <message>" + message + "</message>\
            <add_unsubscribe>0</add_unsubscribe>\
            <response>0</response>\
          </sms>\
      ",
    };
    // Start the request
    request(options, function (err, response, body) {
      if (err) reject(err);
      if (!err && response.statusCode == 200)
      {
        var parser = new DOMParser(); // DOMParser is a dependency in Dependencies
        var xmlDoc = parser.parseFromString(body,"text/xml");
        var status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
        status = status.toString();
        if (status=="0") resolve();
        reject(new Error("Could not send SMS"));
      }
      if (response.statusCode != 200)
        reject(new Error("Could not send SMS :1"));
    });

  });

}
