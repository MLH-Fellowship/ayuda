import React from "react";
import Button from "@material-ui/core/Button";
import auth from "../auth/Auth";
import NavbarAndSidebar from "./NavbarAndSideBar";
const AppLayout = (props) => {
  return (
    <div>

      <NavbarAndSidebar />
      {props.children}
    </div>
  );
};

export default AppLayout;
