import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { url } from "../constants";
import Topic from "../components/Topic";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

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
          <div>
            <Button
              variant="contained"
              color="secondary"
              className="mr-2"
              onClick={() => {
                history.push("/create-subject");
              }}
            >
              Create Subject
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>{
                history.push({
                  pathname:"/create-topic",
                  search:`?subject=${subject._id}`
                })
              }}
            >
              Create Topic
            </Button>
          </div>
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
        <Typography variant="h5" gutterBottom>
          Topics
        </Typography>
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
