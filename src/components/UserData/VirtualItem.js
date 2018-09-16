import React from "react";

const VirtualItem = ({ item }) => {
  return item.imageURL ? (
    <SteamItem key={item.id} item={item} />
  ) : (
    <VgoItem key={item.id} item={item} />
  );
};

const VirtualItemSkeleton = ({ name, image, price, toUser }) => {
  const itemClasses = `VirtualItem-item ${toUser ? 'VirtualItem-item-deposit' : 'VirtualItem-item-withdraw'}`
  return (
    <div className="VirtualItem-wrapper">
      <div className={itemClasses}>
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
  return (
    <VirtualItemSkeleton
      name={item.name}
      image={item.imageURL}
      price={item.buyPrice}
      toUser={item.toUser}
    />
  );
};

const VgoItem = ({ item }) => {
  return (
    <VirtualItemSkeleton
      name={item.name}
      image={item.image["600px"]}
      price={item.suggested_price_floor / 100}
      toUser={item.toUser}
    />
  );
};

export default VirtualItem;
