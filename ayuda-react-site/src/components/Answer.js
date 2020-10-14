import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { url } from "../constants";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined";
import Card from "@material-ui/core/Card";
import InfoCard from "../components/InfoCard";
import { toTimestamp } from "../util/ToTimeStamp";
import Link from "@material-ui/core/Link";

const Answer = ({ id }) => {
  const history = useHistory();

  const [answer, setAnswer] = useState();

  useEffect(() => {
    axios.get(`${url}api/answers/${id}`).then((res) => {
      setAnswer(res.data);
    });
  }, []);

  if (!answer) return "loading..";

  let postedAt = new Date(toTimestamp(answer.createdAt));

  return (
    <div className="w-100">
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

        <div className="w-100">
          <Typography align="left" variant="body1">
            {answer.text}
          </Typography>

          <div className="d-flex justify-content-between mt-2">
            <Link
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={(e) => {
                history.push(
                  `/answer-question/${answer.question._id}/answers/${answer._id}`
                );
                e.preventDefault();
              }}
            >
              <Typography>Reply to comment</Typography>
            </Link>
            <InfoCard
              text1={`Answered By ${answer.user.firstName} ${answer.user.lastName}`}
              text2={`            On ${postedAt.getDate()}/${postedAt.getMonth()}/
            ${postedAt.getFullYear()} at ${postedAt.getHours()}:${postedAt.getMinutes()}`}
            />
          </div>
        </div>
      </div>
      <hr />

      {/* Shows Responses to the answer */}
      {answer.replies.map((reply) => {
        return (

            <div className="d-flex">
              <div style={{ width: "10%" }} />
              <Answer className="ml-2" id={reply._id} />
            </div>

          //   <div>
          //     <div className="d-flex align-items-center">
          //       <div style={{ width: "30%" }} />
          //       <div className="d-flex flex-column mr-3">
          //         <IconButton color="inherit">
          //           <ArrowUpwardOutlined />
          //         </IconButton>
          //         24
          //         <IconButton color="inherit">
          //           <ArrowDownwardOutlined />
          //         </IconButton>
          //       </div>
          //       <Typography align="left" variant="subtitle1">
          //         {reply.text}
          //       </Typography>
          //     </div>

          //     <hr />
          //   </div>
        );
      })}
    </div>
  );
};

export default Answer;
