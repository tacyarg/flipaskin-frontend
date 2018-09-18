import React from "react";
import { Icon } from "@blueprintjs/core";

const Transaction = ({ row }) => {
  return (
    <div className="Exchange-wrapper">
      <Header row={row} />
      <SwitchContent row={row} />
    </div>
  );
};

const Header = ({ row }) => {
  return (
    <div className="Exchange-header">
      <div className="Exchange-header-row">
        <span className="Exchange-header-item">{row.id}</span>
        <span className="Exchange-header-item">
          {row.reason ? row.reason : row.state}
        </span>
      </div>
    </div>
  );
};

const SwitchContent = ({ row }) => {
  switch (row.type) {
    case "deposit":
      return <Deposit amount={row.amount} />;
    case "withdraw":
      return <Withdraw amount={row.amount} />;
    case "transfer":
      return "money moved";
    default:
      return "invaild type";
  }
};

const Deposit = ({ amount }) => {
  return (
    <div className="Exchange-content">
      <div className="Exchange-value Exchange-value-deposit">
        ${amount.toFixed(2)}
      </div>
      <Icon className="Exchange-spacer" iconSize="32" icon="arrow-right" />
      <Icon className="Exchange-spacer" iconSize="32" icon="folder-close" />
    </div>
  );
};

const Withdraw = ({ amount }) => {
  return (
    <div className="Exchange-content">
      <Icon className="Exchange-spacer" iconSize="32" icon="folder-close" />
      <Icon className="Exchange-spacer" iconSize="32" icon="arrow-right" />
      <div className="Exchange-value Exchange-value-withdraw">
        ${amount.toFixed(2)}
      </div>
    </div>
  );
};

export default Transaction;
