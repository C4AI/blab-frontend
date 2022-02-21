import React from "react";

import { IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import "./chatbot.css";
import style from "./style.js";

export const Chatbot = ({ setService }) => {
  const classes = style();
  const handleClick = (event) => {
    setService("inicial");
  };

  return (
    <div className="chatbot">
      <div className="back-button">
        <IconButton className={classes.button} onClick={handleClick}>
          <KeyboardBackspaceIcon style={{ fontSize: 50 }} />
        </IconButton>
      </div>
      <div className="chat-window">
        <h2>CHATBOT</h2>
        <h3>
          Atualmente indisponível. Saiu para tomar um cafezinho e já volta.
        </h3>
      </div>
    </div>
  );
};
