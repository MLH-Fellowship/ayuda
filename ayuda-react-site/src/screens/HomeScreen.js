import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings";
import Question from "../components/Question";
import axios from "axios";
import { url } from "../constants";
import auth from "../auth/Auth";
import { useHistory, Redirect } from "react-router-dom";

const HomeScreen = () => {
  const history = useHistory();

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);

  const searchQuestions = () => {
    axios
      .get(`${url}api/questions?subject=${subject}&topic=${topic}`)
      .then((res) => {
        setQuestions(res.data);
      });
  };

  useEffect(() => {
    axios.get(`${url}api/questions/`).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  return (
    <div class="container">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          All Questions
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (!auth.isAuthenticated()) {
              history.push("/");
            }
          }}
        >
          Ask Question
        </Button>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <Typography variant="overline" gutterBottom>
          {questions.length} questions
        </Typography>
        <div>
          <TextField
            size="small"
            id="filled-password-input"
            label="Subject"
            autoComplete="current-password"
            variant="outlined"
            className="mr-2"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <TextField
            size="small"
            id="filled-password-input"
            label="Topic"
            autoComplete="current-password"
            variant="outlined"
            className="mr-2"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />

          <Button
            onClick={searchQuestions}
            variant="contained"
            startIcon={<SettingsIcon />}
          >
            Apply Filter
          </Button>
        </div>
      </div>
      <hr />
      <div>
        <Button
          variant="contained"
          color="secondary"
          className="mr-2"
          onClick={() => {
            history.push("/subjects");
          }}
        >
          Subjects
        </Button>
        <Button variant="contained" color="secondary">
          Topics
        </Button>
      </div>
      <hr />

      {questions.map((question) => {
        return (
          <div>
            <Question id={question._id} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default HomeScreen;
