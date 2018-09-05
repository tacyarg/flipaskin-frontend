import React, { Component } from "react";
import classNames from "classnames";

import "./Modal.css";
import { Classes, Overlay } from "@blueprintjs/core";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  toggleOverlay = () => {
    var isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  };

  render() {
    var { isOpen } = this.state;
    var { auth, callAction, InnerComponent } = this.props;
    return (
      <div className="Modal-wrapper">
        <Overlay
          autoFocus={false}
          // hasBackdrop={false}
          isOpen={isOpen}
          onClose={this.toggleOverlay}
        >
          <div
            className={classNames(
              Classes.CARD,
              Classes.ELEVATION_4,
              "Modal-overlay"
            )}
          >
            {InnerComponent ? (
              <InnerComponent callAction={callAction} auth={auth} />
            ) : (
              "Hello!"
            )}
          </div>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
