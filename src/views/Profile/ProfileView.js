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
    marginRight: "1em",
  },
  card2 : {
    boxShadow: "1.4 1.4 #182026",
    "&:hover": {
      boxShadow: "1 1 #182026"
    },
    margin: "1em 0",
    marginRight: "1em",
    width: "75"
  },
  grid : {
    margin: "1em 0",
    marginRight: "1em",
    width: "75",
  }
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
      <Grid cointaner className={classes.grid}>
        <Grid item>
          <Grid container spacing={5}>
            <Grid item>
              <Avatar className = {classes.large} alt={this.state.name} src="../../../logo/repositroy2.sv"/>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h2">{this.state.name} {this.state.lastname}</Typography>
              <Button size="small">Editar perfil</Button>
              <Button size="small">Cambiar contraseña</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Card className={classes.card2} >
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>Mi perfil</Typography>
            <Grid container spacing={8}>
              <Grid item>
               <Typography variant="body2" component="p">Nombre: </Typography>
                <Typography variant="body2" component="p">Apellido: </Typography>
                <Typography variant="body2" component="p">Email: </Typography>
                <Typography variant="body2" component="p">Usuario: </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="p">{this.state.name}</Typography>
                <Typography variant="body2" component="p">{this.state.lastname}</Typography>
                <Typography variant="body2" component="p">{this.state.email}</Typography>
                <Typography variant="body2" component="p">{this.state.userName}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid><Grid item>
        <Card className={classes.card2} >
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>Actividad</Typography>
            <Typography variant="h5" component="h2"></Typography>
            <Grid container spacing={8}>
              <Grid item>
                <Typography variant="body2" component="p">Favoritos: </Typography>
                <Typography variant="body2" component="p">Mis recursos: </Typography>
                <Typography variant="body2" component="p">Ver mas tarde: </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="p"> </Typography>
                <Typography variant="body2" component="p"> </Typography>
                <Typography variant="body2" component="p"> </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>;
  }
}

export default withStyles(useStyles)(ProfileView) 