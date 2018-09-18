import React, { Component } from "react";
import "./ExchangeFeed.css";
import { Classes, Card, Elevation } from "@blueprintjs/core";
import ClassNames from "classnames";

class ExchangeFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentExchanges: props.serverState("recentExchanges")
    };

    props.serverState.on("recentExchanges", recentExchanges => {
      this.setState({ recentExchanges });
    });
  }

  render() {
    var { recentExchanges } = this.state;
    return (
      <div className="ExchangeFeed-wrapper">
        <Card elevation={Elevation.ONE} className="ExchangeFeed-container">
          {recentExchanges.map(exchange => {
            return (
              <Card
                className="ExchangeFeed-entry"
                // interactive={!disabled}
                // elevation={Elevation.ONE}
                // className={ItemClass}
                // onClick={!disabled ? onClick : null}
              >
                ID: {exchange.id}
                Items Deposited: {exchange.deposit.items.length}
                Items Withdrawn: {exchange.withdraw.items.length}
              </Card>
            );
          })}
        </Card>
      </div>
    );
  }
}

export default ExchangeFeed;
