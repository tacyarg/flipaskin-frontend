import React, { Component } from "react";
import "./Navbar.css";
import {
  Alignment,
  Navbar,
  Button,
  Tag,
  Position,
  Popover
} from "@blueprintjs/core";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";
import CountUp from "react-countup";
import UserMenu from "./UserMenu";

import UserData from "../UserData/UserData";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.serverState(["me", "user"]) || {},
      balance: props.serverState(["me", "wallet", "balance"]) || 0.0
    };

    props.serverState.on(["me", "wallet"], wallet => {
      this.setState({ balance: wallet.balance });
    });
  }

  openProfile = () => {
    this.settingsModal.toggleOverlay(); // do stuff
  };

  openHistory = () => {
    this.historyModal.toggleOverlay(); // do stuff
  };

  render() {
    var { balance, user } = this.state;
    var { auth, callAction, serverState } = this.props;

    const baseProps = {
      content: (
        <UserMenu
          auth={auth}
          openProfile={this.openProfile}
          openHistory={this.openHistory}
        />
      ),
      position: Position.BOTTOM_RIGHT
    };

    return (
      <Navbar
      // fixedToTop="true"
      >
        <Modal
          onRef={ref => (this.historyModal = ref)}
          InnerComponent={UserData}
          auth={auth}
          callAction={callAction}
          serverState={serverState}
        />
        <Modal
          onRef={ref => (this.settingsModal = ref)}
          InnerComponent={Profile}
          auth={auth}
          callAction={callAction}
        />
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <b>F L I P - A - S K I N</b>
          </Navbar.Heading>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <Tag
            // icon='dollar'
            minimal={true}
            large={true}
          >
            <CountUp
              duration={1}
              prefix="$"
              separator=","
              decimals={2}
              end={balance}
            />
          </Tag>
          <Navbar.Divider />

          {user.username ? (
            <Popover {...baseProps} minimal={true}>
              <Button
                // onClick={this.onClick}
                className="bp3-minimal"
                icon="person"
                text={user.username}
                rightIcon="caret-down"
              />
            </Popover>
          ) : (
            <Button
              // className="bp3-minimal"
              intent="success"
              onClick={auth.login}
              text="Login With Steam"
            />
          )}
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default Header;
