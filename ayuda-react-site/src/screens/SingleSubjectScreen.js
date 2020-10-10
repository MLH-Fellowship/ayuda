import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { url } from "../constants";
import Topic from "../components/Topic";

export default () => {
  let { subjectId } = useParams();
  const [subject, setSubject] = useState();

  useEffect(() => {
    axios.get(`${url}api/subjects/${subjectId}`).then((res) => {
      setSubject(res.data);
    });
  }, []);

  if (!subject) return "Loading...";

  return (
    <div>
      <div className="container">
        <div class="d-flex justify-content-between pt-5">
          <Typography variant="h5" gutterBottom>
            {subject && subject.title ? subject.title : null}
          </Typography>
          <Button variant="contained" color="secondary">
            Create Subject
          </Button>
        </div>
        <div class="d-flex flex-column align-items-start">
          <Typography variant="body" gutterBottom>
            {subject.topics.length == 1
              ? subject.topics.length + " topic"
              : subject.topics.length + " topics"}
          </Typography>

          <Typography variant="body" gutterBottom>
            {subject.questions.length == 1
              ? subject.questions.length + " question"
              : subject.questions.length + " questions"}
          </Typography>
        </div>
        <hr />

        {subject.topics.map((topic) => {
          return (
            <div>
              <Topic id={topic._id} />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
