const Promise = require('bluebird')

module.exports = function (socket, AppToaster) {
  var methods = {}

  function callAction(action, params) {
    return Promise.fromCallback(function (done) {
      socket.emit("action", action, params, done);
    }).catch(err => {
      AppToaster.show({
        intent: "danger",
        message: err.message
      });
    });
  }

  methods.getServerState = function () {
    return callAction('getServerState')
  }

  methods.getMySteamInventory = function () {
    return callAction('scanMyTradeUrl')
  }

  methods.getVgoStore = function () {
    return callAction('getVgoStore')
  }

  methods.calculateSteamTradeValue = function (steamitemids) {
    return callAction("calculateSteamTradeValue", {
      steamitemids
    })
  }

  methods.steamToVgoKeysConversion = function (steamitemids) {
    return callAction("steamToVgoKeysConversion", {
      steamitemids
    })
  }

  methods.sendMySupportEmail = function (email, message) {
    return callAction('sendMySupportEmail', { email, message })
  }

  methods.updateMyProfileSettings = function (settings) {
    var { vgoTradeURL, steamTradeURL, profileBackgroundURL } = settings
    return callAction("updateMyProfileSettings", {
      vgoTradeURL,
      steamTradeURL,
      profileBackgroundURL
    })
  }

  return methods
}