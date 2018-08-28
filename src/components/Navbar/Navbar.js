import React, { Component } from 'react';

import {
  Alignment,
  Navbar,
  Tabs,
  Classes
} from "@blueprintjs/core"

import './Navbar'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTabId: 'trade'
    }
  }

  render() {
    return (
      <Navbar
        // fixedToTop="true"
      >
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <b> Skins.today </b>
          </Navbar.Heading>
          <Navbar.Divider />

          <Tabs onChange={this.handleTabChange} selectedTabId="trade">
            <Tabs.Tab className={Classes.BUTTON} id="trade" title="TRADE" />
            {/* <Tab id="mb" title="Ember" panel={<EmberPanel />} />
              <Tab id="rx" title="React" panel={<ReactPanel />} />
              <Tab id="bb" disabled title="Backbone" panel={<BackbonePanel />} />
              <Tabs.Expander />
              <input className="bp3-input" type="text" placeholder="Search..." /> */}
          </Tabs>

        </Navbar.Group>
      </Navbar>
    )
  }
}

export default Header;