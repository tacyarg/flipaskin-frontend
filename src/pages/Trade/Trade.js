import React, { Component } from "react";
import "./Trade.css";

import items from "../../libs/items";
import Inventory from "../../components/Inventory/Inventory";
import Actions from "../../components/Actions/Actions";
import CountUp from "react-countup";
import { Classes, Button } from "@blueprintjs/core";
import ClassNames from "classnames";

const LabeledTotal = ({ label, total, money }) => {
  return (
    <div
      className={ClassNames(
        Classes.CARD,
        Classes.ELEVATION_1,
        "Trade-content-total"
      )}
    >
      <div className="Trade-content-total-value">
        {money ? (
          <CountUp
            duration={1}
            prefix="$"
            separator=","
            decimals={2}
            end={total}
          />
        ) : (
          <CountUp duration={1} end={total} />
        )}
      </div>
      <div className="Trade-content-total-label">{label}</div>
    </div>
  );
};

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSelected: 0,
      selectCount: 0,
      totalKeys: 0
    };
  }

  onSelect(item) {
    var totalSelected = item.selected
      ? this.state.totalSelected + item.price
      : this.state.totalSelected - item.price;
    var selectCount = item.selected
      ? this.state.selectCount + 1
      : this.state.selectCount - 1;
    this.setState({
      selectCount,
      totalSelected,
      totalKeys: Math.floor(totalSelected / 2.75)
    });
  }

  render() {
    var { totalSelected, selectCount, totalKeys } = this.state;
    var { callAction } = this.props;
    return (
      <div className="Trade">
        <div className="Trade-content">
          <div className="Trade-content-left">
            <Inventory
              onSelect={this.onSelect.bind(this)}
              tools={true}
              getContent={() => {
                this.setState({
                  totalSelected: 0,
                  totalKeys: 0,
                  selectCount: 0
                });
                return callAction("scanMyTradeUrl");
              }}
            />
          </div>
          <div className="Trade-content-right">
            <div className="Trade-content-totals">
              <LabeledTotal
                label="Total Selected"
                total={totalSelected}
                money={true}
              />
              <div className="Trade-content-totals-seperator">=</div>
              <LabeledTotal label="VGO Keys" total={totalKeys} />
            </div>
            <div className="Trade-content-buy">
              <button
                className={ClassNames("Trade-content-buyBtn", Classes.BUTTON, Classes.INTENT_SUCCESS)}
                disabled={selectCount === 0}
                icon="compressed"
              >{`FLIP ${selectCount} ${selectCount > 1 ? 'SKINS' : 'SKIN'}`}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trade;
