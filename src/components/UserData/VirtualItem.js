import React, { Component } from "react";

const VirtualItem = ({ item }) => {
  return item.imageURL ? (
    <SteamItem key={item.id} item={item} />
  ) : (
    <VgoItem key={item.id} item={item} />
  );
};

const VirtualItemSkeleton = ({ name, image, price }) => {
  return (
    <div className="VirtualItem-wrapper">
      <div className="VirtualItem-item">
        <div className="VirtualItem-name">{name}</div>
        <div className="VirtualItem-image">
          <img src={image} alt={name} />
        </div>
        <div className="VirtualItem-price">${price}</div>
      </div>
    </div>
  );
};

const SteamItem = ({ item }) => {
  console.log("STEAMITEM:", item);
  return (
    <VirtualItemSkeleton
      name={item.name}
      image={item.imageURL}
      price={item.buyPrice}
    />
  );
};

const VgoItem = ({ item }) => {
  console.log("VGOITEM:", item);
  return (
    <VirtualItemSkeleton
      name={item.name}
      image={item.image["600px"]}
      price={item.suggested_price_floor / 100}
    />
  );
};

export default VirtualItem;
