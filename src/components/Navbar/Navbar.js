import React, { Component } from "react";
import "./Navbar.css";
import { Alignment, Navbar, Button } from "@blueprintjs/core";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";

class Header extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //   };
  // }

  onClick = () => {
    this.modal.toggleOverlay(); // do stuff
  };

  render() {
    var { auth, callAction } = this.props;
    return (
      <Navbar
      // fixedToTop="true"
      >
        <Modal
          onRef={ref => (this.modal = ref)}
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
          {auth.getUser() ? (
            <Button
              onClick={this.onClick}
              className="bp3-minimal"
              icon="person"
              text={auth.getUser().username}
            />
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
