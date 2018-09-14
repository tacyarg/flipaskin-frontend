import React, { Component } from "react";
import "./Loading.css";

import { Spinner } from "@blueprintjs/core";

class Loading extends Component {
  render() {
    return (
      <div className="Loading-main">
        <div className="Loading-loader">
          <Spinner />
          <h2>Preparing your trading experience...</h2>
        </div>
      </div>
    );
  }
}

export default Loading;
