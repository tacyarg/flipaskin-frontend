import React, { Component } from "react";
import "./Trade.css";

import Inventory from "../../components/Inventory/Inventory";
import CountUp from "react-countup";
import { Classes, Button, Icon } from "@blueprintjs/core";
import ClassNames from "classnames";
import { includes, sampleSize, map } from "lodash";

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

const Stats = ({ sold, trades, exchanged }) => {
  return (
    <div className="stats">
      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={sold || 420420} />
        </div>
        <div className="stat-label">Items Sold</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={trades || 422424.2} />
        </div>
        <div className="stat-label">Total Trades</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp
            prefix="$"
            separator=","
            decimals={2}
            end={exchanged || 12341234.56}
          />
        </div>
        <div className="stat-label">Value Exchanged</div>
      </div>
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
      loading: false,
      selectedItems: {}
    };
  }

  handleStats = item => {
    var totalSelected = item.selected
      ? this.state.totalSelected + item.price
      : this.state.totalSelected - item.price;
    var selectCount = item.selected
      ? this.state.selectCount + 1
      : this.state.selectCount - 1;
    var vgokeys = Math.floor(totalSelected / 2.75);
    this.setState({
      selectCount,
      totalSelected,
      totalKeys: vgokeys > 0 ? vgokeys : 0
    });
  };

  handleSelected = item => {
    var selectedItems = this.state.selectedItems;

    if (item.selected) {
      selectedItems[item.id] = item;
    } else {
      delete selectedItems[item.id];
    }

    this.setState({
      selectedItems
    });
  };

  onSelect = item => {
    this.handleStats(item);
    this.handleSelected(item);
  };

  onSubmit = async () => {
    this.setState({ loading: true });
    // submit trade
    var items = map(this.state.selectedItems, "id");
    // var keys = await this.findVgoKeys(this.state.totalKeys)
    return this.submitExchange(items).then(exchange => {
      this.resetState();
      this.inventory.refreshInventory();
    });
  };

  findVgoKeys = count => {
    return this.props
      .callAction("getVgoStore")
      .then(items => {
        items = items.filter(item => {
          return includes(item.name, "Key");
        });
        return sampleSize(items, count);
      })
      .then(keys => {
        return map(keys, "id");
      });
  };

  submitExchange = steamitemids => {
    return this.props.callAction("steamToVgoKeysConversion", {
      steamitemids
    });
  };

  resetState = () => {
    this.setState({
      totalSelected: 0,
      totalKeys: 0,
      selectCount: 0,
      selectedItems: {},
      loading: false
    });
  };

  getContent = () => {
    this.resetState();
    return this.props.callAction("scanMyTradeUrl");
  };

  componentDidMount() {
    this.openModal();
  }

  openModal = () => {
  };

  render() {
    var { totalSelected, selectCount, totalKeys, loading } = this.state;
    var { auth, callAction, serverState } = this.props;

    return (
      <div className="Trade">

        <div className="Trade-content">
          <div className="Trade-content-left">
            <Inventory
              onRef={ref => (this.inventory = ref)}
              onSelect={this.onSelect}
              tools={true}
              getContent={this.getContent}
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
                <div className="Trade-content-totals-seperator">
                  <Icon iconSize="32" icon="swap-horizontal" />
                </div>
                <LabeledTotal label="VGO Keys" total={totalKeys} />
              </div>
              <div className="Trade-content-buy">
                <Button
                  onClick={this.onSubmit}
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

export default Trade;
