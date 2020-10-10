import React, { useState, useEffect }  from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { url } from "../constants";


export default ({ id }) => {

    const history = useHistory();

    const [topic, setTopic] = useState();


    useEffect(() => {
      axios.get(`${url}api/topics/${id}`).then((res) => {
        setTopic(res.data);
      });
    }, []);

    if (!topic) return "loading.."


  return (
    <div className="d-flex flex-column align-items-start">
      <Link
        style={{ cursor: "pointer", textDecoration: "none" }}
        onClick={() => {
          history.push({
            pathname: `/topics/${topic._id}`,
          });
        }}
      >
        <Typography variant="h5" gutterBottom>
          {topic.title}
        </Typography>
      </Link>


      <Typography variant="body" gutterBottom>
        {topic.questions.length == 1
          ? topic.questions.length + " question"
          : topic.questions.length + " questions"}
      </Typography>
    </div>
  );
};
