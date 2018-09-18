const { fromCallback } = require("bluebird");
module.exports = function(socket) {
  var state = {
    clientToken: localStorage.getItem("clientToken"),
    authToken: localStorage.getItem("authToken"),
    authenticated: false,
    user: null
  };

  var methods = {};

  methods.request = function(action, params) {
    return fromCallback(done => {
      return socket.emit("action", action, params || {}, done);
    });
  };

  methods.login = function() {
    methods
      .request("loginWithSteam", {
        onSuccess: window.location.href,
        onFailure: window.location.href
      })
      .then(res => {
        localStorage.setItem("clientToken", res.clientToken);
        window.location.replace(res.redirectURL);
      })
      .catch(err => console.log(err));
  };

  methods.verifySteam = function() {
    return methods
      .request("loginWithSteamVerify", { clientToken: state.clientToken })
      .then(res => {
        state.authToken = res.id;
        localStorage.setItem("authToken", res.id);
        return methods.setToken();
      })
      .catch(err => localStorage.setItem("clientToken", ""));
  };

  methods.logout = function() {
    localStorage.setItem("clientToken", "");
    localStorage.setItem("authToken", "");
    window.location.replace("/");
  };

  methods.getState = function() {
    return state;
  };

  methods.getUser = function() {
    return state.user;
  };

  methods.setToken = function() {
    return new Promise(function(resolve, reject) {
      socket.emit("setToken", state.authToken, function(err, result) {
        if (err) {
          localStorage.setItem("authToken", "");
          return reject(new Error("Failed to authenticate!"));
        }
        state.authenticated = true;
        state.user = result;
        resolve(result);
      });
    });
  };

  methods.init = function() {
    state.clientToken = localStorage.getItem("clientToken");
    if (state.authToken) {
      methods.setToken();
    } else if (state.clientToken) {
      // methods.verifySteam();
    }

    return methods;
  };

  return methods.init();
};
