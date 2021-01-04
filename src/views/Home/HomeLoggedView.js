import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ItemResource from "../../componets/Items/ItemResource";
import API from "../../config/api";

const axios = require("axios");

const ListItems = (props) => {
  const listItems = props.dataSource.map((data) => (
    <Grid item xs={6} key={data.id.toString()}>
      <ItemResource resource={data} />
    </Grid>
  ));
  return <>{listItems}</>;
};

export default class HomeLoggedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResource: [],
    };
  }

  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(0);
    this.loadResources();
  }

  loadResources = async () => {
    axios({
      method: "GET",
      url: API.baseURL + "recurso/recurso-list/",
    }).then((response) => {
      let data = response.data;
      if (
        response.status === 200 &&
        typeof data?.length != "undefined" &&
        data.length > 0
      ) {
        for (let i = 0; i < data.length; i++) {
          data[i].imagen = data[i].imagen.replace("/download/", "/get/");
          data[i].archivo = data[i].archivo.replace("/download/", "/get/");
        }
        this.setState({ dataResource: data });
      }
    });
  };

  render() {
    return (
      <div style={{ paddingTop: 32, paddinBottom: 32 }}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <ListItems dataSource={this.state.dataResource} />
        </Grid>
      </div>
    );
  }
}
