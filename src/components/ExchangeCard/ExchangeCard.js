import React, { Component } from "react";
import "./ExchangeCard.css";
import {
  Card,
  AnchorButton,
  Alignment,
  Icon
} from "@blueprintjs/core";
import ClassNames from "classnames";
import fakeExchange from "./fakeExchange";
import VirtualItem from "../VirtualItem/VirtualItem";

class ExchangeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchange: fakeExchange
    };
  }

  render() {
    var { exchange } = this.state;
    return (
      <div className="ExchangeCard-wrapper">
        <Card className="ExchangeCard-container">
          <div className="ExchangeCard-header">
            <div className="ExchangeCard-title">{exchange.message}</div>
            <div className="ExchangeCard-seperator" />
            <div>
              <b>ID:</b> {exchange.id}
            </div>
            <div>
              <b>Status:</b> {exchange.state.toUpperCase()}
            </div>
            <div>
              <b>Time Elapsed:</b>{" "}
              {((exchange.updated - exchange.created) / 1000).toFixed(2)}s
            </div>
          </div>
          <div className="ExchangeCard-content">
            <div className="ExchangeCard-content-title">Your Items</div>
            <div className="ExchangeCard-content-items">
              {exchange.deposit.items.map(item => {
                return <VirtualItem key={item.id} item={item} />;
              })}
            </div>

            <Icon
              className="ExchangeCard-spacer"
              iconSize="32"
              icon="swap-vertical"
            />

            <div className="ExchangeCard-content-title">Our Items</div>
            <div className="ExchangeCard-content-items">
              {exchange.withdraw.items.map(item => {
                item.toUser = true;
                return <VirtualItem key={item.id} item={item} />;
              })}
            </div>
          </div>
          <div className="ExchangeCard-seperator" />
          <div className="ExchangeCard-footer">
            <div align={Alignment.RIGHT}>
              <AnchorButton
                target="_blank"
                href={exchange.vgoOfferLink}
                icon="link"
                loading={!exchange.vgoOfferLink}
                minimal={true}
                large={true}
                text="View VGO Offer"
              />
              <AnchorButton
                target="_blank"
                href={exchange.steamOfferLink}
                icon="link"
                loading={!exchange.steamOfferLink}
                minimal={true}
                large={true}
                text="View Steam Offer"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default ExchangeCard;
