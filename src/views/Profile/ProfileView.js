import React from "react";
import { 
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  withStyles,
  Avatar,
  Grid,
} from '@material-ui/core';

const useStyles = (theme)=>({
  root: {
    minWidth: 275,    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  card:{
    display: "inline-grid",
    boxShadow: "1.4 1.4 #182026",
    "&:hover": {
      boxShadow: "1 1 #182026"
    },
    margin: "1em 0",
    marginRight: "1em"
  },
});

class ProfileView extends React.Component {

  constructor (props){
    super(props);
    this.state={
      userName : props.stateApp.userData.username,
      email : props.stateApp.userData.email,
      name : props.stateApp.userData.nombre,
      lastname : props.stateApp.userData.apellido,
    };
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return <div>
      <Grid container spacing={1}>
        <Grid item >
          <Card className={classes.card}>
            <CardContent>    
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item>
                  <Avatar className = {classes.large} alt={this.state.name} src="../../../logo/repositroy2.svg"/>
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="h2">@{this.state.userName}</Typography>
                  <Typography variant="body2" componet="p">{this.state.email}</Typography>
                </Grid>
              </Grid>
            </Grid>           
            </CardContent>
            <CardActions>
              <Button className ={classes.button} size="large" >Editar</Button>
            </CardActions>

          </Card>    
        </Grid>

        <Grid item>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Mi perfil
              </Typography>
              <Typography variant="h5" component="h2">{this.state.name} {this.state.lastname}</Typography>
              <Typography variant="body2" component="p">Favoritos: </Typography>
              <Typography variant="body2" component="p">Mis recursos: </Typography>
              <Typography variant="body2" component="p">Ver mas tarde: </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>;
  }
}

export default withStyles(useStyles)(ProfileView) 