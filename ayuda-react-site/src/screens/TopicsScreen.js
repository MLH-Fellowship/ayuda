import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { url } from "../constants";
import Topic from "../components/Topic";

export default () => {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get(`${url}api/topics/`).then((res) => {
      setTopics(res.data.reverse());
    });
  }, []);
  if(!topics) return "loading..."

  return (
    <div className="container">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          All Topics
        </Typography>
        {/* <Button variant="contained" color="secondary">
          Create Topic
        </Button> */}
      </div>

      <div class="d-flex justify-content-between mt-2">
        <Typography variant="overline" gutterBottom>
          {topics.length} topics
        </Typography>
      </div>
      <hr />

      {topics.map((topic) => {
          return (
            <div>
              <Topic id={topic._id} />
              <hr />
            </div>
          );
        })}
    </div>
  );
};
