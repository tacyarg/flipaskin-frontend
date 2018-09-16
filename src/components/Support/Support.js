import React, { Component } from "react";
import "./Support.css";
import { Icon, Button, InputGroup, FormGroup, Intent, TextArea } from "@blueprintjs/core";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      sending: false
    };
  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value })
  }

  submitMessage = (e) => {
    var { email, message } = this.state
    this.setState({ sending: true });
    this.props.callAction("sendMySupportEmail", {
      email, message
    }).then(result => {
      this.setState({ sending: false })
      if(!result) return
      if(this.props.onSubmit) this.props.onSubmit()
    })
  }

  render() {
    var { email, message, sending } = this.state
    return (
      <div className="Support-wrapper">
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
                leftIcon="user"
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
