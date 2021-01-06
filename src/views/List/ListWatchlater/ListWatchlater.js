import React from "react";
import ListItems from "../../../componets/Items/ListItems";

export default class ListWathlaterView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(3);
  }

  render() {
    return (
      <ListItems
        load="watchlater"
        controlApp={this.props.controlApp}
        stateApp={this.props.stateApp}
      />
    );
  }
}
