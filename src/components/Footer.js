import React from "react";
import { Navbar, AnchorButton, Alignment } from "@blueprintjs/core";

const Footer = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.RIGHT}>
        <AnchorButton
          href="https://github.com/tacyarg/flipaskin-frontend"
          target="_blank"
          minimal={true}
          icon="git-repo"
          text="Github Repo"
        />
        <AnchorButton
          href="https://gist.github.com/tacyarg/2d36f0f20f52eee2b0d599797dfb0a55"
          target="_blank"
          minimal={true}
          icon="predictive-analysis"
          text="API Documentation"
        />
        <AnchorButton
          href="https://gist.github.com/tacyarg/a4c587d57d20347326826d0c73701b6d"
          target="_blank"
          minimal={true}
          icon="help"
          text="FAQ"
        />
        <AnchorButton
          href="https://twitter.com/flipaskincom"
          target="_blank"
          minimal={true}
          icon="comment"
          text="Twitter"
        />
      </Navbar.Group>
    </Navbar>
  );
};

export default Footer;
