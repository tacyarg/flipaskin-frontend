import React, { Component } from "react";
import "./Profile.css";
import Settings from "./Settings";

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

    console.log(props);

    this.state = {
      user: this.props.auth.getUser()
    };
  }

  handleTabChange(navbarTab) {
    return this.setState({ navbarTab });
  }

  render() {
    var { user } = this.state;
    var { callAction } = this.props;

    return (
      <div className="Profile-content">
        <div
          style={headerBackground(
            user.profileBackgroundURL ||
              "https://media.giphy.com/media/BlcWQ9L2VfOFO/giphy.gif"
          )}
        >
          <img
            className="Profile-content-header-avatar"
            src={user.avatarurl}
            alt={user.username}
          />
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
        <div className="Profile-content-body">
          <Settings callAction={callAction} user={user} />
        </div>
      </div>
    );
  }
}

export default Profile;
