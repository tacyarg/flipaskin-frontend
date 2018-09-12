import React, { Component } from "react";
import "./Navbar.css";
import { Alignment, Navbar, Button, Tag } from "@blueprintjs/core";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";
import CountUp from "react-countup";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: props.serverState(['me', 'wallet', 'balance']) || 0.00
    };

    props.serverState.on(['me', 'wallet', 'balance'], balance => {
      this.setState({balance})
    })
  }

  onClick = () => {
    this.modal.toggleOverlay(); // do stuff
  };

  render() {
    var {balance} = this.state
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
            <div>
              
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
              <Button
                onClick={this.onClick}
                className="bp3-minimal"
                icon="person"
                text={auth.getUser().username}
              />
            </div>
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
