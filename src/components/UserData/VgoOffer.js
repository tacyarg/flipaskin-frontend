import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import { map } from "lodash";

import VirtualItem from "./VirtualItem";

const VgoOffer = ({ row }) => {
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
        <span className="Exchange-header-item">ID: {row.id}</span>
        <span className="Exchange-header-item">STATE: {row.state_name}</span>
      </div>
    </div>
  );
};

const Content = ({ row }) => {
  var items =
    row.sender.items.length > 0 ? row.sender.items : row.recipient.items;
  return (
    <div className="Exchange-content">
      <div className="Exchange-items">
        {map(items, item => {
          item.toUser = true
          return <VirtualItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default VgoOffer;
