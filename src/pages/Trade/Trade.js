import React, { Component } from "react";
import "./Trade.css";

import Inventory from "../../components/Inventory/Inventory";
import CountUp from "react-countup";
import {
  Classes,
  Button,
  Icon,
  Alert,
  Navbar,
  Alignment,
  AnchorButton
} from "@blueprintjs/core";
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
        <div className="stat-label">Items Deposited</div>
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
        <div className="stat-label">Value Deposited</div>
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
      remainder: 0,
      exchangeStats: props.serverState("exchangeStats"),
      loading: false,
      selectedItems: {},
      confirmationAlertisOpen: false,
      exchangeDetails: {}
    };

    props.serverState.on("exchangeStats", exchangeStats => {
      this.setState({ exchangeStats });
    });
  }

  handleStats = item => {
    var totalSelected = item.selected
      ? this.state.totalSelected + item.price
      : this.state.totalSelected - item.price;
    var selectCount = item.selected
      ? this.state.selectCount + 1
      : this.state.selectCount - 1;
    var keyPrice = 2.5;
    var vgokeys = Math.floor(totalSelected / keyPrice);
    var remainder = vgokeys > 0 ? totalSelected - vgokeys * keyPrice : 0;
    this.setState({
      selectCount,
      totalSelected,
      totalKeys: vgokeys > 0 ? vgokeys : 0,
      remainder
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
    return this.checkExchange();
  };

  resetPage = () => {
    this.resetState();
    this.inventory.refreshInventory();
  };

  findVgoKeys = count => {
    var { actions } = this.props;

    return actions
      .getVgoStore()
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

  checkExchange = () => {
    var steamitemids = map(this.state.selectedItems, "id");
    var { actions } = this.props;
    return actions.calculateSteamTradeValue(steamitemids).then(details => {
      this.setState({ exchangeDetails: details });
      this.toggleExchangeAlert();
    });
  };

  submitExchange = () => {
    var steamitemids = map(this.state.selectedItems, "id");
    var { actions, AppToaster } = this.props;
    return actions.steamToVgoKeysConversion(steamitemids).then(exchange => {
      if (!exchange) return;
      this.toggleExchangeAlert();
      AppToaster.show({
        intent: "success",
        message: "Exchange sucessfully submitted, please accept your offer!"
      });
    });
  };

  resetState = () => {
    this.setState({
      exchangeDetails: {},
      totalSelected: 0,
      totalKeys: 0,
      selectCount: 0,
      remainder: 0,
      selectedItems: {},
      loading: false
    });
  };

  getContent = () => {
    this.resetState();
    var { actions } = this.props;
    return actions.getMySteamInventory();
  };

  toggleExchangeAlert = () => {
    var { confirmationAlertisOpen } = this.state;
    if (confirmationAlertisOpen) {
      this.resetPage();
      this.setState({ confirmationAlertisOpen: false });
    } else this.setState({ confirmationAlertisOpen: true });
  };

  render() {
    var {
      totalSelected,
      selectCount,
      totalKeys,
      loading,
      remainder,
      exchangeStats,
      confirmationAlertisOpen,
      exchangeDetails
    } = this.state;

    var {
      steamValue = 0,
      afterBalance = 0,
      currentBalance = 0,
      vgoKeysEarned = 0
    } = exchangeDetails;
    return (
      <div className="Trade">
        <Alert
          icon="swap-horizontal"
          isOpen={confirmationAlertisOpen}
          cancelButtonText="Cancel"
          confirmButtonText="Submit Exchange"
          intent="primary"
          onCancel={this.toggleExchangeAlert}
          onConfirm={this.submitExchange}
        >
          <p>
            Are you sure you want to sell <b>Steam Items</b> valued at{" "}
            <b>${steamValue.toFixed(2)}</b> in exchange for{" "}
            <b>{vgoKeysEarned} VGO Keys</b>?
          </p>
          <p>
            <i>
              This exchange will{" "}
              {currentBalance < afterBalance ? `credit ` : `deduct `}
              <b>${Math.abs(currentBalance - afterBalance).toFixed(2)}</b>
              {currentBalance < afterBalance ? ` to` : ` from`} your current
              wallet balance resulting in a total balance of{" "}
              <b>${afterBalance.toFixed(2)}</b>.
            </i>
          </p>
        </Alert>
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
            <div className="Trade-content-exchange">
              <div className="Trade-content-totals">
                <LabeledTotal
                  label="Value Selected"
                  total={totalSelected}
                  money={true}
                />
                <Icon
                  className="Trade-content-totals-seperator"
                  iconSize="32"
                  icon="arrow-right"
                />
                <LabeledTotal label="VGO Keys" total={totalKeys} />
                <Icon
                  className="Trade-content-totals-seperator"
                  iconSize="32"
                  icon="plus"
                />
                <LabeledTotal label="Wallet" total={remainder} money={true} />
              </div>
              <div className="Trade-content-buy">
                <Button
                  onClick={this.onSubmit}
                  intent="primary"
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
            {/* <div className="Trade-content-spacer" /> */}
            <Stats
              sold={exchangeStats.steamItemsDeposited}
              trades={exchangeStats.successCount}
              exchanged={exchangeStats.steamValueDeposited}
            />
          </div>
        </div>
        <Navbar>
          <Navbar.Group align={Alignment.RIGHT}>
            <AnchorButton
              href="https://github.com/tacyarg/flipaskin-frontend"
              target="_blank"
              minimal={true}
              icon="git-repo"
              text="Github Repo"
            />
            <AnchorButton
              href="https://gist.github.com/tacyarg/ff93960806f8ed45c6b763c7573f14be"
              target="_blank"
              minimal={true}
              icon="predictive-analysis"
              text="API Documentation"
            />
            <AnchorButton
              href="https://gist.github.com/tacyarg/a4c587d57d20347326826d0c73701b6d"
              target="_blank"
              minimal={true}
              icon="help"
              text="FAQ"
            />
            <AnchorButton
              href="https://twitter.com/flipaskincom"
              target="_blank"
              minimal={true}
              icon="comment"
              text="Twitter"
            />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default Trade;
