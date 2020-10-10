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

  const [title, setTitle] = useState();
  const [subject, setSubject] = useState();

  useEffect(() => {
    axios.get(`${url}api/subjects/${subjectId}`).then((res) => {
      setSubject(res.data);
    });
  }, []);

  if (!subject) return "Loading...";

  const config = {
    headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
  };

  const createTopic = () => {
    axios.post(url + "api/topics", { title, subject: subjectId }, config).then((res) => {
      history.push("/topics/");
    });
  };

  return (
    <div className="container d-flex flex-column align-items-start">
      <div class="d-flex flex-column align-items-start pt-5">
        <Typography variant="h5" gutterBottom>
          Create Topic
        </Typography>
        <Typography variant="h5" gutterBottom>
          Subject: {subject.title}
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

      <Button
        variant="contained"
        color="secondary"
        className="mt-4"
        onClick={createTopic}
      >
        <Typography>Create Topic</Typography>
      </Button>
    </div>
  );
};
