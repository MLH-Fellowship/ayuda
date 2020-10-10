import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings";
import Question from "../components/Question";
import axios from "axios";
import { url } from "../constants";

const SearchScreen = (props) => {

  return (
    <div className="container">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          Search Results
        </Typography>
        <Button variant="contained" color="secondary">
          Ask Question
        </Button>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <Typography variant="overline" gutterBottom>
          2 questions
        </Typography>
      </div>
    </div>
  );
};

export default SearchScreen;
