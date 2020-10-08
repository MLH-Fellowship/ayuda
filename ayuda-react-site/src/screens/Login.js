import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    minWidth: "40%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Login(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const preventDefault = (event) => event.preventDefault();

  return (
    <div className="container centered d-flex align-items-center justify-content-center">
      <Card className={classes.root}>
        <div className="p-3">
        <CardContent>
        <Typography variant="h2" gutterBottom>
            Ayuda
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div className="d-flex flex-column">
              <TextField
                className="mb-4"
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
            </div>
          </form>
        </CardContent>
        <CardActions className="d-flex justify-content-center">
          <div className="d-flex flex-column">
            <Button variant="contained" color="primary" className="mb-2">
              <Typography>Login</Typography>
            </Button>
            <div>
              <Typography variant="overline" gutterBottom>
                Don't Have An Account?
              </Typography>
              <Link className="pl-1" href="#" onClick={preventDefault}>
                Signup!
              </Link>
            </div>
          </div>
        </CardActions>
        </div>
        
      </Card>
    </div>
  );
}
