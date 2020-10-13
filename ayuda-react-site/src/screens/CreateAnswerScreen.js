import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { url } from "../constants";
import axios from 'axios';
import auth from "../auth/Auth";
import { useHistory } from "react-router-dom";
import {extendSession} from "../util/ExtendSession";
import { useParams } from "react-router-dom";


export default () => {
    const history = useHistory();


    const [text, setText] = useState();

    let { questionId, answerId } = useParams();



    const answerQuestion = () => {
        axios.post(url + "api/answers/", { text, question:questionId, answerBeingRepliedTo: answerId }, {headers: { Authorization: `Bearer ${auth.getAccessToken()}` }})
        .then(res => {
            history.goBack()
        })
        .catch(e =>{
          if (e.response.data.message == "jwt expired") {
            extendSession(answerQuestion)
          }
        })
    }

  return (
    <div className="container d-flex flex-column align-items-start">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          Answer Question
        </Typography>
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
        onChange={(e)=>{
            setText(e.target.value)
        }}
      />

      <Button variant="contained" color="secondary" className="mt-4" onClick={answerQuestion}>
        <Typography>Answer Question</Typography>
      </Button>
    </div>
  );
};
