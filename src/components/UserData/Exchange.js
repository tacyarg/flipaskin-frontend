import React from "react";
import { Icon } from "@blueprintjs/core";
import { map } from "lodash";

import VirtualItem from "./VirtualItem";

const Exchange = ({ row }) => {
  return (
    <div className="Exchange-wrapper">
      <Header row={row} />
      <Content row={row} />
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

const Content = ({ row }) => {
  return (
    <div className="Exchange-content">
      <div className="Exchange-items">
        {map(row.deposit.items, item => {
          return <VirtualItem key={item.key} item={item} />;
        })}
      </div>
      <Icon className="Exchange-spacer" iconSize="32" icon="arrow-right" />
      <div className="Exchange-items">
        {map(row.withdraw.items, item => {
          item.toUser = true
          return <VirtualItem key={item.key} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Exchange;
