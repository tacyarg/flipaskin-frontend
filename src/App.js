import React, { Component } from "react";
import "./App.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";

import Navbar from "./components/Navbar/Navbar";
import Trade from "./pages/Trade/Trade";

class App extends Component {
  render() {
    var { auth, user, serverState, callAction, AppToaster } = this.props;
    return (
      <div className="App">
        <Navbar auth={auth} />
        <Trade user={user} callAction={callAction} />
      </div>
    );
  }
}

export default App;
