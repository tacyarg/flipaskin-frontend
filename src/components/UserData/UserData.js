import React, { Component } from "react";
import "./UserData.css";
import { Alignment, Navbar, Button, Tag, Tab, Icon } from "@blueprintjs/core";
import { keys, map, sortBy, debounce } from "lodash";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: this.props.auth.getUser()
      userData: props.serverState("me") || {},
      currentTab: "Exchanges"
    };

    var updateUserData = debounce(userData => {
      this.setState({ userData });
    }, 1000);

    props.serverState.on("me", userData => {
      updateUserData(userData);
    });
  }

  changeTab = key => {
    this.setState({ currentTab: key });
  };

  render() {
    var { user, currentTab, userData } = this.state;
    var { callAction } = this.props;
    var tabs = {
      Exchanges: userData.exchanges,
      "VGO Offers": userData.offers,
      "Steam Offers": userData.steamoffers,
      Transactions: userData.transactions
    };
    return (
      <div className="UserData-content">
        {userData ? (
          <div>
            <Navbar
              className="UserData-navbar"
              // fixedToTop="true"
            >
              <NavButtons
                currentTab={currentTab}
                tabs={tabs}
                changeTab={this.changeTab}
              />
            </Navbar>

            <div className="UserData-panel">
              {map(sortBy(tabs[currentTab], "created").reverse(), row => {
                return (
                  <div key={row.id} className="UserData-panel-row">
                    <div className="UserData-panel-row-header">
                      <span className="UserData-panel-row-header-item">
                        {row.id}
                      </span>
                      <span className="UserData-panel-row-header-item">
                        {row.created}
                      </span>
                    </div>
                    <div className="UserData-panel-row-header">
                      <span className="UserData-panel-row-header-item">
                        {row.type}
                      </span>
                      <span className="UserData-panel-row-header-item">
                        {row.reason ? row.reason : row.state}
                      </span>
                    </div>
                    <div className="UserData-panel-row-content">
                      <TabSwitch currentTab={currentTab} row={row} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          "You need to be logged in!"
        )}
      </div>
    );
  }
}

const NavButtons = ({ currentTab, tabs, changeTab }) => {
  return (
    <Navbar.Group
    // Alignment={Alignment.LEFT}
    >
      {keys(tabs).map(key => {
        return (
          <Button
            key={key}
            onClick={e => changeTab(key)}
            active={key === currentTab}
            minimal={true}
            text={key}
          />
        );
      })}
    </Navbar.Group>
  );
};

const TabSwitch = ({ currentTab, row }) => {
  switch (currentTab) {
    case "Exchanges":
      return <ExchangeContent row={row} />;
    case "VGO Offers":
      return "offers";
    case "Steam Offers":
      return "offers";
    case "Transactions":
      return "tx";
    default:
      return "Invaild Panel";
  }
};

const ExchangeContent = ({ row }) => {
  return (
    <div className="Exchange-content">
      <div className="Exchange-items">
        {map(row.deposit.items, item => {
          return item.imageURL ? (
            <SteamItem key={item.id} item={item} />
          ) : (
            <VgoItem key={item.id} item={item} />
          );
        })}
      </div>
      <div className="Exchange-spacer">
        <Icon iconSize="32" icon="exchange" />
      </div>
      <div className="Exchange-items">
        {map(row.withdraw.items, item => {
          return item.imageURL ? (
            <SteamItem key={item.id} item={item} />
          ) : (
            <VgoItem key={item.id} item={item} />
          );
        })}
      </div>
    </div>
  );
};

const VirtualItem = ({ name, image, price }) => {
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
    <VirtualItem name={item.name} image={item.imageURL} price={item.buyPrice} />
  );
};

const VgoItem = ({ item }) => {
  console.log("VGOITEM:", item);
  return (
    <VirtualItem
      name={item.name}
      image={item.image["600px"]}
      price={item.suggested_price_floor / 100}
    />
  );
};

export default Profile;
