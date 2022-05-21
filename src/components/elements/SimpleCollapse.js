import React from "react";
import { withSnackbar } from "notistack";
import { Button, Icon } from "@mui/material";

class SimpleCollapse extends React.Component {
  state = {
    collapsed: true,
  };

  handleToggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsedMessage, openedMessage } = this.props;
    const { collapsed } = this.state;

    let displayMessage = (
      <React.Fragment>
        {openedMessage}
        <Icon>expand_less</Icon>
      </React.Fragment>
    );
    if (collapsed) {
      displayMessage = (
        <React.Fragment>
          {collapsedMessage}
          <Icon>expand_more</Icon>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Button onClick={this.handleToggleCollapse}>
          {displayMessage}
        </Button>
        <div style={{ display: collapsed ? "none" : "block" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withSnackbar(SimpleCollapse);
