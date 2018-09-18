import React, { Component } from "react";
import "./UserData.css";
import { Navbar, Button, Card, Elevation } from "@blueprintjs/core";
import { keys, map, sortBy, debounce } from "lodash";

import Exchange from "./Exchange";
import VgoOffer from "./VgoOffer";
import SteamOffer from "./SteamOffer";
import Transaction from "./Transaction";

const DEFAULT_TAB = "Exchanges";
const TABS = {
  Exchanges: "exchanges",
  "VGO Offers": "offers",
  "Steam Offers": "steamoffers",
  Transactions: "transactions"
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.serverState(["me", "user"]) || {},
      tabs: TABS,
      tabData: props.serverState(["me", TABS[DEFAULT_TAB]]),
      currentTab: DEFAULT_TAB
    };

    var updateUserData = debounce(userData => {
      var key = TABS[this.state.currentTab];
      this.setState({ tabData: userData[key] });
    }, 1000);

    props.serverState.on("me", updateUserData);
  }

  changeTab = key => {
    var { tabs } = this.state;
    var { serverState } = this.props;
    this.setState({
      currentTab: key,
      tabData: serverState(["me", tabs[key]])
    });
  };

  render() {
    var { tabs, tabData, currentTab, user } = this.state;
    return (
      <div className="UserData-content">
        {user ? (
          <div>
            <Navbar className="UserData-navbar" fixedToTop="true">
              <NavButtons
                currentTab={currentTab}
                tabs={tabs}
                changeTab={this.changeTab}
              />
            </Navbar>

            <div className="UserData-panel">
              {map(sortBy(tabData, "created").reverse(), row => {
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
