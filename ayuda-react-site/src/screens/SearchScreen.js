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


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchScreen = (props) => {

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);

  let query = useQuery();
  let text = query.get("text");
  console.log("text stored in search screen " + text)

  useEffect(() => {
    axios.get(`${url}api/questions?text=${text}`).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const searchQuestions = () => {
    axios
      .get(`${url}api/questions?subject=${subject}&topic=${topic}&text=${text}`)
      .then((res) => {
        setQuestions(res.data);
      });
  };

  return (
<div class="container">
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
      {questions.map((question) => {
        return (
          <div>
            <Question
              title={question.title}
              text={question.text}
              topic={question.topic.title}
              subject={question.subject.title}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default SearchScreen;
