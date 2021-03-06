import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { url } from "../constants";
import axios from 'axios';
import auth from "../auth/Auth";
import { useHistory } from "react-router-dom";
import {extendSession} from "../util/ExtendSession";


export default () => {
    const history = useHistory();


    const [title, setTitle] = useState();


    const createSubject = () => {
        axios.post(url + "api/subjects", { title }, {headers: { Authorization: `Bearer ${auth.getAccessToken()}` }})
        .then(res => {
            history.goBack()
        })
        .catch(e =>{
          if (e.response.data.message == "jwt expired") {
            extendSession(createSubject)
          }
        })
    }

  return (
    <div className="container d-flex flex-column align-items-start">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          Create Subject
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
        onChange={(e)=>{
            setTitle(e.target.value)
        }}
      />

      <Button variant="contained" color="secondary" className="mt-4" onClick={createSubject}>
        <Typography>Create Subject</Typography>
      </Button>
    </div>
  );
};
