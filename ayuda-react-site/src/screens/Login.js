import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import backgroundImage from "../images/question.jpg";

const useStyles = makeStyles({
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
    <div className="container centered flex-column d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: "40%" }}>
        <div>
          <CardMedia
            className="p-0 m-0"
            style={{ height:"180px" }}
            image={backgroundImage}
            title="Contemplative Reptile"
          />
          <div className="pl-3 pr-3 pb-3">
            <CardContent>
              <Typography variant="h2" gutterBottom>
                <p className="styledTitle">Ayuda</p>
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
              <Button variant="contained" color="primary">
                <Typography>Login</Typography>
              </Button>
            </CardActions>
          </div>
        </div>
      </Card>

      <Card className="mt-3 p-2" style={{ minWidth: "40%" }}>
        <Typography variant="overline">Don't Have An Account?</Typography>
        <Link href="#" onClick={preventDefault}>
          <Typography className="pl-1" variant="overline">
            Sign up!
          </Typography>
        </Link>
      </Card>
    </div>
  );
}
