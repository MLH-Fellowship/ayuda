import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined";
import Link from "@material-ui/core/Link";

const Question = ({topic, text, subject, title}) => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column mr-3">
        <IconButton color="inherit">
          <ArrowUpwardOutlined />
        </IconButton>
        <IconButton color="inherit">
          <ArrowDownwardOutlined />
        </IconButton>
      </div>

      <div className="d-flex flex-column align-items-start">
        <Link style={{ cursor: "pointer", textDecoration: "none" }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Link>

        <Typography variant="body" gutterBottom>
          {text}
        </Typography>
        <div>
          <Button variant="contained" size="small" className="mr-2">
            {subject}
          </Button>
          <Button variant="contained" size="small">
            {topic}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
