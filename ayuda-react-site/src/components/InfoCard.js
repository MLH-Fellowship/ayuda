import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

export default ({ text1, text2, userId }) => {
  const history = useHistory();

  return (
    <div>
      <Card className="p-2 m-2">
        <Link
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={(e) => {
            history.push({
              pathname: `/profile/${userId}`,
            });
            e.preventDefault();
          }}
        >
          <Typography>{text1}</Typography>{" "}
        </Link>

        <Typography>{text2}</Typography>
      </Card>
    </div>
  );
};
