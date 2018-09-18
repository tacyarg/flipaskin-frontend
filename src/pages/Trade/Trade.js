import React, { Component } from "react";
import "./Trade.css";

import Inventory from "../../components/Inventory/Inventory";
import { Button, Icon, Alert } from "@blueprintjs/core";
import { includes, sampleSize, map } from "lodash";

import LabeledTotal from "./LabeledTotal";
import Stats from "./Stats";
import Footer from "../../components/Footer";
// import ExchangeFeed from "../../components/ExchangeFeed/ExchangeFeed";

import Modal from "../../components/Modal/Modal";
import ExchangeCard from "../../components/ExchangeCard/ExchangeCard";

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
      exchangeDetails: {},
      realtimeExchange: {}
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
      this.toggleExchangeModal(exchange);
      AppToaster.show({
        intent: "success",
        message: "Exchange sucessfully submitted, please accept your offer!"
      });
    });
  };

  resetState = () => {
    this.setState({
      realtimeExchange: {},
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

  toggleExchangeModal = (exchange) => {
    this.setState({
      exchange
    })
    this.modal.toggleOverlay();
  };

  componentDidMount() {
    // this.toggleExchangeModal();
  }

  render() {
    var {
      totalSelected,
      selectCount,
      totalKeys,
      loading,
      remainder,
      exchangeStats,
      confirmationAlertisOpen,
      exchangeDetails,
      exchange
    } = this.state;

    var {
      steamValue = 0,
      afterBalance = 0,
      currentBalance = 0,
      vgoKeysEarned = 0
    } = exchangeDetails;
    return (
      <div className="Trade">
        <Modal
          {...this.props}
          onRef={ref => (this.modal = ref)}
          InnerComponent={ExchangeCard}
          onSubmit={this.openModal}
          canOutsideClickClose={false}
          exchange={exchange}
        />

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
            <div className="Trade-content-spacer" />
            <Stats
              sold={exchangeStats.steamItemsDeposited}
              trades={exchangeStats.successCount}
              exchanged={exchangeStats.steamValueDeposited}
            />
            {/* <ExchangeFeed {...this.props} /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Trade;
