import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { url } from "../constants";
import { useHistory } from "react-router-dom";

const Question = ({ id }) => {
  const history = useHistory();

  const [question, setQuestion] = useState();
  useEffect(() => {
    axios.get(`${url}api/questions/${id}`).then((res) => {
      setQuestion(res.data);
    });
  }, []);

  if (!question) return "Loading...";

  return (
    <div className="d-flex">


      <div className="d-flex flex-column align-items-start">
        <Link
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={() => {
            history.push({
              pathname: `/questions/${question._id}`,
            });
          }}
        >
          <Typography variant="h5" gutterBottom>
            {question.title}
          </Typography>
        </Link>

        <Typography variant="body" gutterBottom>
          {question.text}
        </Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            className="mr-2"
            onClick={() => {
              history.push(`../subjects/${question.subject._id}`);
            }}
          >
            {question.subject.title}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              history.push(`../topics/${question.topic._id}`);
            }}
          >
            {question.topic.title}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
