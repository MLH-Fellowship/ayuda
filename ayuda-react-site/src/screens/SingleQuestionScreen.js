import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "../constants";
import { toTimestamp } from "../util/ToTimeStamp";

import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";

const preventDefault = (event) => event.preventDefault();

export default (props) => {
  const history = useHistory();
  let { questionId } = useParams();

  const [question, setQuestion] = useState();

  useEffect(() => {
    axios.get(`${url}api/questions/${questionId}`).then((res) => {
      res.data.answers = res.data.answers.reverse();

      setQuestion(res.data);
    });
  }, []);

  if (!question) return "Loading...";

  let postedAt = new Date(toTimestamp(question.createdAt));

  return (
    <div className="container">
      <div class="d-flex justify-content-between pt-5">
        <div class="d-flex flex-column align-items-start">
          <Typography variant="h5" gutterBottom>
            {question && question.title ? question.title : null}
          </Typography>
          <div className="d-flex">
            <Typography variant="overline" className="mr-2">
              Asked{" "}
              <span className="font-weight-bold">
                {postedAt.getDate()}/{postedAt.getMonth()}/
                {postedAt.getFullYear()}
              </span>
            </Typography>
            <Typography variant="overline">
              Answers{" "}
              <span className="font-weight-bold">
                {question.answers.length}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <hr />
      <Typography align="left" className="d-flex justify-content-start">{question.text}</Typography>

      <div className="my-4">
        <Button
          variant="contained"
          size="small"
          className="mr-2"
          onClick={() => {
            history.push(`../topics/${question.topic._id}`);
          }}
        >
          {question.topic.title}
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            history.push(`../topics/${question.topic._id}`);
          }}
        >
          {question.subject.title}
        </Button>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Link
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={(e) => {
            props.history.push(`/answer-question/${questionId}`);
            preventDefault(e);
          }}
        >
          <Typography style={{ cursor: "pointer" }}>Add a comment</Typography>
        </Link>
        <Card className="p-2">
          <Typography>
            Posted By {question.user.firstName} {question.user.lastName}
          </Typography>
          <Typography>
            Asked {postedAt.getDate()}/{postedAt.getMonth()}/
            {postedAt.getFullYear()} at {postedAt.getHours()}:
            {postedAt.getMinutes()}
          </Typography>
        </Card>
      </div>
      <hr />
      <div className="d-flex">
        <Typography variant="h6" gutterBottom>
          {question.answers.length == 1
            ? question.answers.length + " Answer"
            : question.answers.length + " Answers"}
        </Typography>
      </div>
      <hr />



      {question.answers.map((answer) => {
        return (
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column mr-3">
              <IconButton color="inherit">
                <ArrowUpwardOutlined />
              </IconButton>
              24
              <IconButton color="inherit">
                <ArrowDownwardOutlined />
              </IconButton>
            </div>

            <Typography align="left">{answer.text}</Typography>
          </div>
        );
      })}
    </div>
  );
};
