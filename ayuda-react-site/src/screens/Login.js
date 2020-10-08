import React, {useState} from "react";
import auth from "../auth/Auth";
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
import { url } from "../constants";
import axios from 'axios';

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post(url + "api/user/login", { email, password })
      .then(res => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        auth.login(()=>{
            props.history.push("/app")
        }, accessToken, refreshToken)
        //this.setState({ persons });
      })
  }

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
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
                  />
                  <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}
                  />
                </div>
              </form>
            </CardContent>

            <CardActions className="d-flex justify-content-center">
              <Button variant="contained" color="primary" style={{ minWidth: "40%" }} onClick={login}>
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
