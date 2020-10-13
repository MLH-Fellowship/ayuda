import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";



export default ({ text1, text2 }) => {
  return (
    <div>
      <Card className="p-2 m-2">
        <Typography>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Card>
    </div>
  );
};
