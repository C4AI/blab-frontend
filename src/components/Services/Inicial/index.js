import React from "react";
import PropTypes from 'prop-types';

import { Button, Grid } from "@material-ui/core";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { motion } from "framer-motion";

import "./inicial.css";
import style from "./style.js";

export const Inicial = ({ setService }) => {
  const classes = style();

  const handleClick = (event) => {
    setService(event.currentTarget.id);
  };

  return (
    <div className="inicial">
      <motion.div className="title">
        <p>Blue Amazonia Project</p>
        <hr />
        <h2>BLAB</h2>
      </motion.div>
      <div className="button-wrapper">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            id="chatbot"
            className={classes.button}
            startIcon={<SmartToyIcon style={{ fontSize: 30 }} />}
            onClick={handleClick}
          >
            ChatBot
          </Button>
          <Button
            id="wiki"
            className={classes.button}
            startIcon={<LibraryBooksIcon style={{ fontSize: 30 }} />}
            onClick={handleClick}
          >
            Wiki
          </Button>
        </Grid>
      </div>
    </div>
  );
};

Inicial.propTypes = {
    setService: PropTypes.func.isRequired
};
