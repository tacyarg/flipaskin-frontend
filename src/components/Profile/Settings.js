import React, { Component } from "react";
import { InputGroup, FormGroup, Button, Intent } from "@blueprintjs/core";

class Settings extends Component {
  constructor(props) {
    super(props);

    var vgoTradeURL,
      steamTradeURL,
      profileBackgroundURL = null;

    if (props.user) {
      vgoTradeURL = props.user.vgoTradeURL;
      steamTradeURL = props.user.steamTradeURL;
      profileBackgroundURL = props.user.profileBackgroundURL;
    }

    this.state = {
      saving: false,
      vgoTradeURL: vgoTradeURL,
      steamTradeURL: steamTradeURL,
      profileBackgroundURL: profileBackgroundURL
    };
  }

  onProfileBackgroundURLChange = e => {
    if (this.props.onBackgroundChange) {
      this.props.onBackgroundChange(e.target.value);
    }
    this.setState({ profileBackgroundURL: e.target.value });
  };

  onSteamTradeURLChange = e => {
    this.setState({ steamTradeURL: e.target.value });
  };

  onExpressTradeTradeURLChange = e => {
    this.setState({ vgoTradeURL: e.target.value });
  };

  saveSettings = e => {
    var { actions, toggleOverlay } = this.props;
    this.setState({ saving: true });
    return actions.updateMyProfileSettings(this.state).then(resp => {
      this.setState({ saving: false });
      toggleOverlay();
    });
  };

  render() {
    var {
      vgoTradeURL,
      steamTradeURL,
      profileBackgroundURL,
      saving
    } = this.state;
    return (
      <div className="Profile-content-body-panel-wrapper">
        <div className="Profile-content-body-panel">
          <div className="Settings">
            <div className="Settings-inputs">
              <FormGroup
                // helperText="YOu can find it "
                label="Profile Background URL"
                labelFor="text-input"
                // labelInfo="(required)"
              >
                <InputGroup
                  value={profileBackgroundURL}
                  onChange={this.onProfileBackgroundURLChange}
                  leftIcon="link"
                  placeholder="https://media.giphy.com/media/l2SpW7nWd4QuBE5LW/giphy.gif"
                />
              </FormGroup>

              <FormGroup
                // helperText="YOu can find it "
                label="Steam Trade URL"
                labelFor="text-input"
                labelInfo="(required)"
              >
                <InputGroup
                  value={steamTradeURL}
                  onChange={this.onSteamTradeURLChange}
                  leftIcon="link"
                  placeholder="https://steamcommunity.com/tradeoffer/new/..."
                />
              </FormGroup>

              {/* <FormGroup
                // helperText="YOu can find it "
                label="ExpressTrade Trade URL"
                labelFor="text-input"
                labelInfo="(required)"
              >
                <InputGroup
                  value={vgoTradeURL}
                  onChange={this.onExpressTradeTradeURLChange}
                  leftIcon="link"
                  placeholder="https://trade.opskins.com/t/3667..."
                />
              </FormGroup> */}
            </div>

            <Button
              loading={saving}
              className="Settings-savebtn"
              large={true}
              text="Save"
              intent={Intent.SUCCESS}
              icon="floppy-disk"
              onClick={this.saveSettings}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
