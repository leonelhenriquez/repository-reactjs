import React from "react";

export default class HomeLoggedView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(0);
  }

  render() {
    return (
      <>
        <h1 className="titulo">Pagina principal</h1>
      </>
    );
  }
}
