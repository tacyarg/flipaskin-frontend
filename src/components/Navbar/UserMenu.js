import React, { Component } from "react";
import { Menu } from "@blueprintjs/core";

class UserMenu extends Component {
  render() {
    const { auth, openProfile, openHistory } = this.props;
    return (
      <Menu
        // large={true}
      >
        {/* <Menu.Item text="Profile" icon="user" onClick={openProfile} /> */}
        <Menu.Item text="Settings" icon="cog" onClick={openProfile} />
        <Menu.Item text="History" icon="history" onClick={openHistory} />
        <Menu.Divider />
        <Menu.Item text="Logout" icon="log-out" onClick={auth.logout} />
      </Menu>
    );
  }
}

export default UserMenu;