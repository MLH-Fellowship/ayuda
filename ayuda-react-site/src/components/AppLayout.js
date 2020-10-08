import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../auth/Auth";
import Navbar from "./Navbar";
const AppLayout = (props) => {
  return (
    <div>

      <Navbar />
      {props.children}
    </div>
  );
};

export default AppLayout;
