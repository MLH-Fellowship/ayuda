import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Filter from "../components/Filter";
import Drawer from "../components/Drawer";

const HomeScreen = () => {
  return (
    <div class="container">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          All Questions
        </Typography>
        <Button variant="contained" color="secondary">
          Ask Question
        </Button>
      </div>
      <div class="d-flex justify-content-between">
        <Typography variant="overline" gutterBottom>
          50 questions
        </Typography>
      </div>
      {/* <Drawer /> */}
      <hr />
    </div>
  );
};



export default HomeScreen;
