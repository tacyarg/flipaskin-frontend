import React, { Component } from "react";
import "./Profile.css";
import Settings from "./Settings";
import Stats from "./Stats";

const headerBackground = function(profileBackgroundURL) {
  return {
    backgroundImage: `url('${profileBackgroundURL}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "aquamarine",
    color: "white",
    width: "100%",
    minHeight: "200px",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "inset 0 0 5px black",
    display: "flex",
    flexWrap: "wrap"
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.serverState(["me", "user"]),
      stats: props.serverState(["me", "stats"])
    };
  }

  onBackgroundChange = url => {
    var user = this.state.user;
    user.profileBackgroundURL = url;
    this.setState({ user });
  };

  render() {
    var { user, stats } = this.state;
    var { actions } = this.props;

    return (
      <div className="Profile-content">
        <div
          style={headerBackground(
            user.profileBackgroundURL ||
              "https://media.giphy.com/media/BlcWQ9L2VfOFO/giphy.gif"
          )}
        >
          <div className="Profile-content-header">
            <div>
              <img
                className="Profile-content-header-avatar"
                src={user.avatarurl}
                alt={user.username}
              />
            </div>
            <div className="Profile-content-header-userdetails">
              <span className="Profile-content-header-username">
                {user.username}
              </span>
              <span className="Profile-content-header-steamurl">
                <b>SteamID:</b> {user.steamid}
              </span>
              {/* <span className="Profile-content-header-steamurl"><b>ProfileURL:</b> <a target="_Blank" href={user.steamProfileURL}>{user.steamProfileURL}</a></span> */}
            </div>
          </div>
        </div>
        <div className="Profile-content-body">
          <Stats
            deposited={stats.steamItemsDeposited}
            trades={stats.successCount}
            value={stats.steamValueDeposited}
          />
          <Settings
            actions={actions}
            user={user}
            onBackgroundChange={this.onBackgroundChange}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
