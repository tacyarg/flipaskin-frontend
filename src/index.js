import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import axios from "axios";
import Promise from "bluebird";
import State from "./libs/state";
import openSocket from "socket.io-client";
import Auth from "./libs/auth";
import AppToaster from "./components/AppToaster";
// const ROOT_DOMAIN = 'flipaskin.com'
// const API_URL = `https://api.${ROOT_DOMAIN}`
// const SOCKET_URL = `https://socket.${ROOT_DOMAIN}`
const API_URL = "http://localhost:4321";
const SOCKET_URL = "http://localhost:4322";
const serverState = State();
const socket = openSocket(SOCKET_URL, {
  transports: ['websocket', 'polling']
});
const auth = Auth(socket);

async function getServerState() {
  var resp = await axios.get(`${API_URL}/getServerState`)
  serverState.set(null, resp.data);
  socket.on("diff", serverState.patch);
  return serverState;
}

function getUserAuth() {
  return auth
    .verifySteam()
    .catch(err => {
      /* do nothing */
    })
    .then(auth.setToken)
    .catch(err => {
      /* do nothing */
    });
}

function callAction(action, params) {
  return Promise.fromCallback(function(done) {
    socket.emit("action", action, params, done);
  }).catch(err => {
    AppToaster.show({
      intent: "danger",
      message: err.message
    });
  });
}

Promise.props({
  auth: auth,
  user: getUserAuth(),
  serverState: getServerState(),
  callAction: callAction,
  AppToaster: AppToaster
}).then(props => {
  ReactDOM.render(<App {...props} />, document.getElementById("root"));
  registerServiceWorker();
});
