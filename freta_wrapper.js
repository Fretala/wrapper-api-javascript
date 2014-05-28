(function() {
  var SANDBOX_URL    = 'http://0.0.0.0:8080';
  //var SANDBOX_URL    = 'https://sandbox.freta.la';
  var PRODUCTION_URL = 'https://api.freta.la';

  var token;

  // Create the XHR object.
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }

  // Make the actual CORS request.
  function makeCorsRequest(url, method, data, cb) {
    // All HTML5 Rocks properties support CORS.
    var xhr = createCORSRequest(method, url);
    if (!xhr) {
      throw new Error('CORS not supported');
      return;
    }
    if(token) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Response handlers.
    xhr.onload = function() {
      token = undefined;
      var json = JSON.parse(xhr.responseText);
      if(xhr.status == 200 || xhr.status == 204) {
        cb.call(this, undefined, json);
      } else {
        var err = new Error(json.message);
        cb.call(this, err, undefined);
      }
    };

    xhr.onerror = function(e) {
      token = undefined;
      throw new Error('Woops, there was an error making the request.');
    };

    xhr.send(data);
  }

  window.FretaWrapper = function(env) {
    if(env != 'sandbox' && env != 'production') {
      throw new Error('Environment must be sandbox or production');
    }
    if(env == 'production') {
      this.url = PRODUCTION_URL;
    } else {
      this.url = SANDBOX_URL;
    }
  };

  FretaWrapper.prototype.sync = function(endpoint, method, data, cb) {
    if(data != undefined) {
      data = JSON.stringify(data);
    }
    makeCorsRequest(this.url+endpoint, method, data, cb);
  };

  FretaWrapper.prototype.insertCard = function(data, cb) {
    this.sync('/cards', 'POST', data, cb);
  };

  FretaWrapper.prototype.getCards = function(cb) {
    this.sync('/cards', 'GET', undefined, cb);
  };

  FretaWrapper.prototype.deleteCard = function(cardToken, cb) {
    this.sync('/cards/'+cardToken, 'DELETE', undefined, cb);
  };

  FretaWrapper.prototype.setToken = function(t) {
    token = t;
  };

})();
