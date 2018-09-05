import React, { Component } from "react";
import "./Trade.css";

import items from "../../libs/items";
import Inventory from "../../components/Inventory/Inventory";
import Actions from "../../components/Actions/Actions";
import CountUp from "react-countup";
import { Classes, Button } from "@blueprintjs/core";
import ClassNames from "classnames";
import { isArray } from "lodash";

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
      totalKeys: 0,
      loading: false
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

  onSubmit() {
    this.setState({ loading: true });
  }

  render() {
    var { totalSelected, selectCount, totalKeys, loading } = this.state;
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
                  selectCount: 0,
                  loading: false
                });
                return callAction("scanMyTradeUrl");
              }}
            />
          </div>
          <div className="Trade-content-right">
            <div className="Trade-content-order-details">
              <div className="Trade-content-totals">
                <LabeledTotal
                  label="Value Selected"
                  total={totalSelected}
                  money={true}
                />
                <div className="Trade-content-totals-seperator">=</div>
                <LabeledTotal label="VGO Keys" total={totalKeys} />
              </div>
              <div className="Trade-content-buy">
                <Button
                  onClick={this.onSubmit.bind(this)}
                  className="Trade-content-buyBtn"
                  loading={loading}
                  disabled={selectCount === 0}
                  icon="git-push"
                  large={true}
                  text={`FLIP ${selectCount} ${
                    selectCount > 1 ? "SKINS" : "SKIN"
                  }`}
                />
              </div>
            </div>
            <div className="Trade-content-spacer" />
            <Stats />
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({ sold, trades, exchanged }) => {
  return (
    <div className="stats">
      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={sold || 420} />
        </div>
        <div className="stat-label">Items Sold</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={trades || 4200.2} />
        </div>
        <div className="stat-label">Total Trades</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp
            prefix="$"
            separator=","
            decimals={2}
            end={exchanged || 1234.56}
          />
        </div>
        <div className="stat-label">Value Exchanged</div>
      </div>
    </div>
  );
};

export default Trade;
