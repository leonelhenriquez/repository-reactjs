import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { NoteAddOutlined } from "@material-ui/icons";
import ListItems from "../../componets/Items/ListItems";

const useStyles = (theme) => ({
  buttonContainer: {
    textAlign: "right",
    paddingTop: 32,
  },
  buttonAdd: {
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 50,
  },
});

class MyResourcesView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(1);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.buttonAdd}
            startIcon={<NoteAddOutlined />}
            color="secondary"
            variant="contained"
            onClick={() => this.props.controlApp.resourceDialog.add()}
          >
            Agregar recurso
          </Button>
        </div>
        <ListItems
          load="myresources"
          controlApp={this.props.controlApp}
          stateApp={this.props.stateApp}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(MyResourcesView);
