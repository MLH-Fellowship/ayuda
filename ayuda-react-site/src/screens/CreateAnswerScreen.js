import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { url } from "../constants";
import axios from "axios";
import auth from "../auth/Auth";
import { useHistory } from "react-router-dom";
import { extendSession } from "../util/ExtendSession";
import { useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Answer from "../components/Answer";
import InfoCard from "../components/InfoCard";
import { toTimestamp } from "../util/ToTimeStamp";

export default () => {
  const history = useHistory();

  const [text, setText] = useState();

  let { questionId, answerId } = useParams();
  const [question, setQuestion] = useState();

  useEffect(() => {
    axios.get(`${url}api/questions/${questionId}`).then((res) => {
      res.data.answers = res.data.answers.reverse();
      setQuestion(res.data);
    });
  }, []);

  if (!question) return "Loading...";


  const answerQuestion = () => {
    axios
      .post(
        url + "api/answers/",
        { text, question: questionId, answerBeingRepliedTo: answerId },
        { headers: { Authorization: `Bearer ${auth.getAccessToken()}` } }
      )
      .then((res) => {
        history.goBack();
      })
      .catch((e) => {
        if (e.response.data.message == "jwt expired") {
          extendSession(answerQuestion);
        }
      });
  };

  let postedAt = new Date(toTimestamp(question.createdAt));

  return (
    <div className="container d-flex flex-column align-items-start">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          Answer Question
        </Typography>
      </div>


      <div>
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
        <div className="d-flex justify-content-end mt-4">

          <InfoCard
            text1={`Posted By ${question.user.firstName} ${question.user.lastName}`}
            text2={`            Asked ${postedAt.getDate()}/${postedAt.getMonth()}/
            ${postedAt.getFullYear()} at ${postedAt.getHours()}:${postedAt.getMinutes()}`}
          />
        </div>
      </div>

      <TextField
        id="outlined-basic"
        label="Text"
        placeholder="Please enter your answer..."
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
        onClick={answerQuestion}
      >
        <Typography>Answer Question</Typography>
      </Button>
    </div>
  );
};
