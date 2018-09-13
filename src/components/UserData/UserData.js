import React, { Component } from "react";
import "./UserData.css";
import { Navbar, Button, Card, Elevation } from "@blueprintjs/core";
import { keys, map, sortBy, debounce } from "lodash";

import Exchange from "./Exchange";
import VgoOffer from "./VgoOffer";
import SteamOffer from "./SteamOffer";
import Transaction from "./Transaction";

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
                  <Card
                    key={row.id}
                    // interactive={true}
                    elevation={Elevation.ONE}
                    className="UserData-panel-row"
                    // onClick={!disabled ? onClick : null}
                  >
                    <TabSwitch currentTab={currentTab} row={row} />
                  </Card>
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
      return <Exchange row={row} />;
    case "VGO Offers":
      return <VgoOffer row={row} />;
    case "Steam Offers":
      return <SteamOffer row={row} />;
    case "Transactions":
      return <Transaction row={row} />;
    default:
      return "Invaild Panel";
  }
};

export default Profile;
