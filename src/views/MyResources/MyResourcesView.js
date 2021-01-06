import React from "react";
import ListItems from "../../componets/Items/ListItems";

export default class MyResourcesView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(1);
  }

  render() {
    return (
      <ListItems
        load="myresources"
        controlApp={this.props.controlApp}
        stateApp={this.props.stateApp}
      />
    );
  }
}
