import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const useStyles = makeStyles((theme) => ({
  expanIcon: {
    position: "relative",
    top: "-15px",
  },
}));
const ExpandedIcon = ({ expanded, setExpanded }) => {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.expanIcon}
      onClick={() => setExpanded(!expanded)}>
      {expanded ? (
        <ExpandLessIcon style={{ color: "black" }} />
      ) : (
        <ExpandMoreIcon style={{ color: "black" }} />
      )}
    </IconButton>
  );
};

export default ExpandedIcon;
