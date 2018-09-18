const { fromCallback } = require("bluebird");
const { orderBy, map } = require("lodash");

module.exports = function(socket, AppToaster) {
  var methods = {};

  function callAction(action, params) {
    return fromCallback(function(done) {
      socket.emit("action", action, params, done);
    }).catch(err => {
      AppToaster.show({
        intent: "danger",
        message: err.message
      });
    });
  }

  methods.getServerState = function() {
    return callAction("getServerState");
  };

  methods.getMySteamInventory = function() {
    return callAction("scanMyTradeUrl").then(inventory => {
      inventory = map(inventory, item => {
        item.disabled =
          !item.name.includes("Key") ||
          item.tradable === 0 ||
          item.state !== "Available" ||
          item.location !== "Remote";
        return item;
      });
      inventory = orderBy(inventory, "disabled");
      return inventory;
    });
  };

  methods.getVgoStore = function() {
    return callAction("getVgoStore");
  };

  methods.calculateSteamTradeValue = function(steamitemids) {
    return callAction("calculateSteamTradeValue", {
      steamitemids
    });
  };

  methods.steamToVgoKeysConversion = function(steamitemids) {
    return callAction("steamToVgoKeysConversion", {
      steamitemids
    });
  };

  methods.sendMySupportEmail = function(email, message) {
    return callAction("sendMySupportEmail", { email, message });
  };

  methods.updateMyProfileSettings = function(settings) {
    var { vgoTradeURL, steamTradeURL, profileBackgroundURL } = settings;
    return callAction("updateMyProfileSettings", {
      vgoTradeURL,
      steamTradeURL,
      profileBackgroundURL
    });
  };

  return methods;
};
