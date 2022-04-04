import { makeStyles } from "@material-ui/core";

export default makeStyles({
  grid: {
    maxWidth: "40%",
    minWidth: "600px",
    width: "70%",
    minHeight: "40vh",
    backgroundColor: "transparent",
    margin: "auto",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(2.6px)",
    border: "1px solid rgba(255, 255, 255, 0.14)",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  root: {
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
});
