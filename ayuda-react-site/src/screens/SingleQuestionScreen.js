import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "../constants";
import { toTimestamp } from "../util/ToTimeStamp";

import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Answer from "../components/Answer";
import InfoCard from "../components/InfoCard";

const preventDefault = (event) => event.preventDefault();

export default (props) => {
  const history = useHistory();
  let { questionId } = useParams();

  const [question, setQuestion] = useState();
  const [answersToTheQuestion, setAnswersToTheQuestion] = useState();

  useEffect(() => {
    axios.get(`${url}api/questions/${questionId}`).then((res) => {
      res.data.answers = res.data.answers.reverse();
      setAnswersToTheQuestion(res.data.answers.filter(answer => !answer.answerBeingRepliedTo))
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
                {answersToTheQuestion.length}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <hr />
      <Typography align="left" className="d-flex justify-content-start">
        {question.text}
      </Typography>

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
          style={{ cursor: "pointer" ,textDecoration: "none" }}
          onClick={(e) => {
            props.history.push(`/answer-question/${questionId}`);
            preventDefault(e);
          }}
        >
          <Typography>Add a comment</Typography>
        </Link>
        <InfoCard
          text1={`Posted By ${question.user.firstName} ${question.user.lastName}`}
          text2={`            Asked ${postedAt.getDate()}/${postedAt.getMonth()}/
            ${postedAt.getFullYear()} at ${postedAt.getHours()}:
            ${postedAt.getMinutes()}`}
        />
      </div>
      <hr />
      <div className="d-flex">
        <Typography variant="h6" gutterBottom>
          {answersToTheQuestion.length == 1
            ? answersToTheQuestion.length + " Answer"
            : answersToTheQuestion.length + " Answers"}
        </Typography>
      </div>
      <hr />

      {answersToTheQuestion.map((answer) => (
        <Answer id={answer._id} />
      ))}
    </div>
  );
};
