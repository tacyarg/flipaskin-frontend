import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import openSocket from "socket.io-client";

import Promise from "bluebird";
import State from "./libs/state";
import Actions from './libs/actions'
import Auth from "./libs/auth";
import AppToaster from "./components/AppToaster";
import Loading from "./pages/Loading/Loading";

const ROOT_DOMAIN = 'flipaskin.com'
const SOCKET_URL = `https://socket.${ROOT_DOMAIN}`

const socket = openSocket(SOCKET_URL, {
  transports: ['websocket', 'polling']
});

const auth = Auth(socket);
const actions = Actions(socket, AppToaster);

function initAuth() {
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

function initServerState() {
  return actions.getServerState().then(state => {
    const serverState = State();
    serverState.set(null, state);
    socket.on("diff", serverState.patch);
    return serverState
  }) 
}

Promise.props({
  auth: auth,
  user: initAuth(),
  serverState: initServerState(),
  actions: actions,
  AppToaster: AppToaster
}).then(props => {
  ReactDOM.render(<App {...props} />, document.getElementById("root"));
  registerServiceWorker();
});

ReactDOM.render(<Loading />, document.getElementById("root"));
