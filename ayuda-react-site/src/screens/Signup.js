import React from "react";
import auth from "../auth/Auth";
import Button from '@material-ui/core/Button';

export default function (props) {
  return (
    <div>
      Signup
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Test
      </Button>
    </div>
  );
};
