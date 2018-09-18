import React from "react";
import { map } from "lodash";
import VirtualItem from "../VirtualItem/VirtualItem";

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
        <span className="Exchange-header-item">{row.id}</span>
        <span className="Exchange-header-item">{row.state}</span>
      </div>
    </div>
  );
};

const Content = ({ row }) => {
  return (
    <div className="Exchange-content">
      <div className="Exchange-items">
        {map(row.items, item => {
          return <VirtualItem key={item.key} item={item} />;
        })}
      </div>
    </div>
  );
};

export default SteamOffer;
