import React from "react";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Container } from "@mui/material";

import "./Reporter.css";
import style from "./style.js";
import BLABReporter from "./BlabReporterTwitterBot";
import { useTranslation } from "react-i18next";

/**
 *  Reporter service. Currently displays the profile's twitter
 *  feed with, a Follow button and the number of followers
 *
 *  @category Services
 *  @subcategory Reporter
 *  @component
 */
const Reporter = ({ setService }) => {
  const classes = style();
  const handleClick = () => {
    setService("Inicial");
  };

  useTranslation();
  return (
    <div className="reporter">
      <div align="left">
        <Button
          className={classes.button}
          onClick={handleClick}
          startIcon={<KeyboardBackspaceIcon style={{ fontSize: 50 }} />}
        />
      </div>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ position: "relative", minWidth: "40vw" }}
      >
        <BLABReporter />
      </Container>
    </div>
  );
};

Reporter.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Reporter;
