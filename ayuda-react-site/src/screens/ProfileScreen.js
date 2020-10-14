import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../constants";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export default () => {
  let { userId } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`${url}api/user/${userId}`).then((res) => {
      //res.data.answers = res.data.answers.reverse();
      setUser(res.data);
    });
  }, []);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))(Badge);

  if (!user) return "Loading...";

  return (
    <div>
      {" "}
      <div class="container">
        <div class="d-flex justify-content-between pt-5">
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
        </div>

        <div class="d-flex flex-column align-items-center pt-5">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              style={{ width: "100px", height: "100px" }}
              alt="User"
              src="/static/images/avatar/3.jpg"
            />{" "}
          </StyledBadge>
          <div className="pt-2 d-flex">
            <Typography variant="h5" className="mr-1">
              {capitalize(user.firstName)}
            </Typography>
            <Typography variant="h5"> {capitalize(user.lastName)}</Typography>
          </div>
        </div>

        <div className="pt-5">
          <div className="d-flex justify-content-between">
            <Typography variant="h5" className="mr-1">
              Points
            </Typography>
            <Typography variant="h5"> {user.points}</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography variant="h5" className="mr-1">
              Questions Posted
            </Typography>
            <Typography variant="h5"> {user.questions.length}</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography variant="h5" className="mr-1">
              Answers Posted
            </Typography>
            <Typography variant="h5"> {user.answers.length}</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography variant="h5" className="mr-1">
              Email Address
            </Typography>
            <Typography variant="h5"> {capitalize(user.email)}</Typography>
          </div>
          <div className="d-flex justify-content-between pt-2">
            <Typography variant="h5" className="mr-1">
              Country
            </Typography>
            <Typography variant="h5"> {capitalize(user.country)}</Typography>
          </div>
          <div className="d-flex justify-content-between pt-2">
            <Typography variant="h5" className="mr-1">
              School
            </Typography>
            <Typography variant="h5"> {capitalize(user.school)}</Typography>
          </div>
          <div className="d-flex justify-content-between pt-2">
            <Typography variant="h5" className="mr-1">
              Field
            </Typography>
            <Typography variant="h5"> {capitalize(user.field)}</Typography>
          </div>
        </div>


      </div>
    </div>
  );
};
