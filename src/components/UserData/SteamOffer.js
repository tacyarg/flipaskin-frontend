import React, { Component } from "react";
import { Icon } from "@blueprintjs/core";
import { map } from "lodash";

import VirtualItem from "./VirtualItem";

const makeUrl = offerid => {
  return `https://steamcommunity.com/tradeoffer/${offerid}`;
};

const SteamOffer = ({ row }) => {
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
        <span className="Exchange-header-item">STATE: {row.state}</span>
      </div>
    </div>
  );
};

const Content = ({ row }) => {
  return (
    <div className="Exchange-content">
      <div className="Exchange-items">
        {map(row.items, item => {
          return <VirtualItem item={item} />;
        })}
      </div>
    </div>
  );
};

export default SteamOffer;
