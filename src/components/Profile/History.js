import React, { Component } from "react";
import moment from "moment";
import { Classes, Tooltip, Position } from "@blueprintjs/core";
import classNames from "classnames";
import { sumBy } from "lodash";
import CountUp from "react-countup";
import LazyComponent from "react-component-lazy";
import { Spinner } from "@blueprintjs/core";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      offers: []
    };
  }

  componentDidMount() {
    this.props
      .callAction("getMyOfferHistory")
      .then(offers => this.setState({ loading: false, offers }));
  }

  calcProfit(offer) {
    return (
      (sumBy(offer.sender.items, "suggested_price") -
        sumBy(offer.recipient.items, "suggested_price")) /
      100
    );
  }

  render() {
    var { loading } = this.state;
    return (
      <div className="Profile-content-body-panel-wrapper">
        <div className="Profile-content-body-panel">
          {loading ? (
            <Spinner className="history-loading" />
          ) : (
            <div className="history">
              {this.state.offers.map(offer => {
                return (
                  <div className={classNames(Classes.CARD, "history-entry")}>
                    <div className="history-entry-header">
                      <a
                        className="history-entry-offerid"
                        target="_blank"
                        href={offer.url}
                      >
                        {offer.id}
                      </a>
                      <span className="history-entry-time">
                        {moment(offer.created).calendar()}
                      </span>
                    </div>
                    <div className="history-entry-body">
                      <div className="history-entry-items-container">
                        {offer.sender.items.length > 0
                          ? offer.sender.items.map(item => {
                              return <OfferItem item={item} />;
                            })
                          : offer.recipient.items.map(item => {
                              return <OfferItem item={item} />;
                            })}
                        {offer.state !== 3 ? (
                          <span className="history-entry-items-value">
                            <b>{offer.state_name}</b>
                          </span>
                        ) : (
                          <span className="history-entry-items-value">
                            <b>Profit: </b>
                            <CountUp
                              style={
                                this.calcProfit(offer) > 0
                                  ? { color: "green" }
                                  : { color: "red" }
                              }
                              prefix="$"
                              separator=","
                              decimals={2}
                              end={this.calcProfit(offer)}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const OfferItem = ({ item }) => {
  return (
    <LazyComponent>
      <Tooltip
        content={`$${item.suggested_price / 100} - ${item.name}`}
        position={Position.BOTTOM}
      >
        <div className="history-entry-item">
          <img src={item.image["300px"]} alt={item.name} />
        </div>
      </Tooltip>
    </LazyComponent>
  );
};

export default History;
