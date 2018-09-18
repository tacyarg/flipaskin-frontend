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
import CountUp from "react-countup";
import UserMenu from "./UserMenu";

import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";
import UserData from "../UserData/UserData";
import Support from "../Support/Support";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.serverState(["me", "user"]) || {},
      balance: props.serverState(["me", "wallet", "balance"]) || 0.0
    };

    props.serverState.on(["me", "user"], user => {
      this.setState({ user });
    });
    props.serverState.on(["me", "wallet"], wallet => {
      this.setState({ balance: wallet.balance });
    });
  }

  openModal = component => {
    // if not component is provided, just toggle.
    if (component) {
      this.setState({
        modalContent: component
      });
    }

    this.modal.toggleOverlay();
  };

  openProfile = () => {
    this.openModal(Profile);
  };

  openHistory = () => {
    this.openModal(UserData);
  };

  openSupport = () => {
    this.openModal(Support);
  };

  render() {
    var { balance, user, modalContent } = this.state;
    var { auth, actions, serverState } = this.props;

    const baseProps = {
      content: (
        <UserMenu
          auth={auth}
          openProfile={this.openProfile}
          openHistory={this.openHistory}
          openSupport={this.openSupport}
        />
      ),
      position: Position.BOTTOM_RIGHT
    };

    return (
      <Navbar
      // fixedToTop="true"
      >
        <Modal
          onRef={ref => (this.modal = ref)}
          InnerComponent={modalContent}
          auth={auth}
          actions={actions}
          serverState={serverState}
          onSubmit={this.openModal}
        />
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <b>F L I P - A - S K I N</b>
          </Navbar.Heading>
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <Tag
            icon='bank-account'
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
