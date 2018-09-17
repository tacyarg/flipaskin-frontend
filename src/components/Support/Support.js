import React, { Component } from "react";
import "./Support.css";
import {
  Icon,
  Button,
  InputGroup,
  FormGroup,
  Intent,
  TextArea,
  AnchorButton
} from "@blueprintjs/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      sending: false
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = e => {
    var { email, message } = this.state;
    var { actions, onSubmit } = this.props;
    this.setState({ sending: true });
    return actions.sendMySupportEmail(email, message).then(result => {
      this.setState({ sending: false });
      if (!result) return;
      if (onSubmit) onSubmit();
    });
  };

  render() {
    var { email, message, sending } = this.state;
    return (
      <div className="Support-wrapper">
        <AnchorButton
          href="https://gist.github.com/tacyarg/a4c587d57d20347326826d0c73701b6d"
          target="_blank"
          minimal={true}
          icon="help"
          text="FAQ"
        />
        <div className="Support-content">
          <Icon icon="help" iconSize={64} />
          <h2>Are You Having Troubles?</h2>
          <div className="Support-inputs">
            <FormGroup
              label="Email"
              labelFor="text-input"
              labelInfo="(required)"
            >
              <InputGroup
                value={email}
                onChange={this.onEmailChange}
                leftIcon="inbox"
                placeholder="email@mydomain.com"
              />
            </FormGroup>

            <FormGroup
              label="Message"
              labelFor="text-input"
              labelInfo="(required)"
            >
              <TextArea
                fill={true}
                value={message}
                onChange={this.onMessageChange}
                placeholder="Hello, please help me!"
              />
            </FormGroup>
          </div>
        </div>
        <Button
          loading={sending}
          className="Support-submit"
          large={true}
          text="Create Ticket"
          intent={Intent.PRIMARY}
          icon="floppy-disk"
          onClick={this.submitMessage}
        />
      </div>
    );
  }
}

export default Profile;
