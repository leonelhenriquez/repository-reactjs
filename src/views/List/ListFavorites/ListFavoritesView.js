import React from "react";
import ListItems from "../../../componets/Items/ListItems";

export default class ListFavoritesView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(2);
  }

  render() {
    return (
      <ListItems
        load="favorites"
        controlApp={this.props.controlApp}
        stateApp={this.props.stateApp}
      />
    );
  }
}
