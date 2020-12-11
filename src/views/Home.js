import { Button } from "@material-ui/core";
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Hola soy un boton
        </Button>
      </div>
    );
  }
}

export default Home;
