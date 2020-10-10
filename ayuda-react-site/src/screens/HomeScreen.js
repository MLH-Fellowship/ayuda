import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SettingsIcon from "@material-ui/icons/Settings";
import Question from "../components/Question";
import axios from "axios";
import { url } from "../constants";

const HomeScreen = () => {
  const [subject, setSubject] = useState();
  const [topic, setTopic] = useState();
  const [questions, setQuestions] = useState([]);

  const searchQuestions = () => {
    if (subject && topic) {
      axios
        .get(`${url}api/questions?subject=${subject}&topic=${topic}`)
        .then((res) => {
          setQuestions(res.data);
        });
    } else if (topic) {
      axios.get(`${url}api/questions?topic=${topic}`).then((res) => {
        setQuestions(res.data);
      });
    } else if (subject) {
      axios.get(`${url}api/questions?subject=${subject}`).then((res) => {
        setQuestions(res.data);
      });
    } else {
      axios.get(`${url}api/questions/`).then((res) => {
        setQuestions(res.data);
      });
    }
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
            onChange={(e)=>{
              setSubject(e.target.value)
            }}
          />
          <TextField
            size="small"
            id="filled-password-input"
            label="Topic"
            autoComplete="current-password"
            variant="outlined"
            className="mr-2"
            onChange={(e)=>{
              setTopic(e.target.value)
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

export default HomeScreen;
