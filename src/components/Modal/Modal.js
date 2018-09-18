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
    var { InnerComponent, canOutsideClickClose } = this.props;
    if (canOutsideClickClose === undefined) canOutsideClickClose = true;
    return (
      <div className="Modal-wrapper">
        <Overlay
          canOutsideClickClose={canOutsideClickClose}
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
              <InnerComponent {...this.props} />
            ) : (
              "Hello I am a modal!"
            )}
          </div>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
