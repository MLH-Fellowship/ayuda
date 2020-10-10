import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { url } from "../constants";
import Subject from "../components/Subject";

export default () => {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get(`${url}api/subjects/`).then((res) => {
      setSubjects(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div class="d-flex justify-content-between pt-5">
        <Typography variant="h5" gutterBottom>
          All Subjects
        </Typography>
        <Button variant="contained" color="secondary">
          Create Subject
        </Button>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <Typography variant="overline" gutterBottom>
          {subjects.length} subjects
        </Typography>
      </div>
      <hr />

      {subjects.map((subject) => {
        console.log(subject);
        return (
          <div>
            <Subject
              title={subject.title}
              questions={subject.questions}
              topics={subject.topics}
              id={subject._id}
            />

            <hr />
          </div>
        );
      })}
    </div>
  );
};
