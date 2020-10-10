import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { url } from "../constants";
import axios from "axios";
import auth from "../auth/Auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const history = useHistory();
  let query = useQuery();

  let subjectId = query.get("subject");
  let topicId = query.get("topic");

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [subject, setSubject] = useState();
  const [topic, setTopic] = useState();

  useEffect(() => {
    axios.get(`${url}api/subjects/${subjectId}`).then((res) => {
      setSubject(res.data);
    });

    axios.get(`${url}api/topics/${topicId}`).then((res) => {
      setTopic(res.data);
    });
  }, []);

  if (!subject || !topic) return "Loading...";

  const config = {
    headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
  };

  const createQuestion = () => {
    axios
      .post(
        url + "api/questions",
        { title, text, subject: subjectId, topic: topicId },
        config
      )
      .then((res) => {
        history.push(`topics/${topic._id}`);
      });
  };

  return (
    <div className="container d-flex flex-column align-items-start">
      <div class="d-flex flex-column align-items-start pt-5">
        <Typography variant="h5" gutterBottom>
          Create Question
        </Typography>
        <Typography variant="h5" gutterBottom>
          Subject: {subject.title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Topic: {topic.title}
        </Typography>
      </div>

      <TextField
        id="outlined-basic"
        label="Title"
        placeholder="Please enter a title..."
        variant="outlined"
        size="small"
        className="mt-4"
        fullWidth={true}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Text"
        placeholder="Please enter the question you wish to ask..."
        variant="outlined"
        size="small"
        className="mt-4"
        fullWidth={true}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <Button
        variant="contained"
        color="secondary"
        className="mt-4"
        onClick={createQuestion}
      >
        <Typography>Create Question</Typography>
      </Button>
    </div>
  );
};
