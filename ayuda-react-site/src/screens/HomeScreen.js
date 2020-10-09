import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings"

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
      <div class="d-flex justify-content-between mt-2">
        <Typography variant="overline" gutterBottom>
          50 questions
        </Typography>
        <div>
          <TextField
            size="small"
            id="filled-password-input"
            label="Subject"
            autoComplete="current-password"
            variant="outlined"
            className="mr-2"
          />
          <TextField
            size="small"
            id="filled-password-input"
            label="Topic"
            autoComplete="current-password"
            variant="outlined"
            className="mr-2"
          />

          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
          >
            Apply Filter
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default HomeScreen;
