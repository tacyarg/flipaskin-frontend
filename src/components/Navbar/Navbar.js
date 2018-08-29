import React, { Component } from 'react';

import {
  Alignment,
  Navbar,
  Button
} from "@blueprintjs/core"

import './Navbar'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    var { auth } = this.props
    return (
      <Navbar
      // fixedToTop="true"
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <b>FlipASkin</b>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {
            auth.getUserAuth() ?
              <Button
                className="bp3-minimal"
                icon="person"
                text={auth.getUserAuth().username}
              /> :
              <Button
                // className="bp3-minimal" 
                intent="success"
                onClick={auth.login}
                text="Login With Steam"
              />
          }
        </Navbar.Group>
      </Navbar>
    )
  }
}

export default Header;