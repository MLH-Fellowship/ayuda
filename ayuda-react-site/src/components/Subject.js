import React, { useState, useEffect }  from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { url } from "../constants";


export default ({ id }) => {

    const history = useHistory();

    const [subject, setSubject] = useState();


    useEffect(() => {
      axios.get(`${url}api/subjects/${id}`).then((res) => {
        setSubject(res.data);
      });
    }, []);

    if (!subject) return "loading.."


  return (
    <div className="d-flex flex-column align-items-start">
      <Link
        style={{ cursor: "pointer", textDecoration: "none" }}
        onClick={() => {
          history.push({
            pathname: `/subjects/${id}`,
          });
        }}
      >
        <Typography variant="h5" gutterBottom>
          {subject.title}
        </Typography>
      </Link>

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
  );
};
