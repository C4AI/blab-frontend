import React from "react";
import PropTypes from "prop-types";

import { Container } from "@mui/material";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { Trans } from "react-i18next";

import "./ServiceContainer.css";

const ServiceContainer = (props) => {
  const returnClicked = () => {
    props.setService("Initial");
  };

  const readMoreClicked = () => {
    window.open("https://c4ai.inova.usp.br/research/#KEML");
  };

  return(
    <Container
      className="service-container"
      component="main"
      maxWidth="xs"
      sx={props.sx}
    >
      <div className="container-header">
        <div className="return-button">
          <Button
            onClick={returnClicked}
            startIcon={<KeyboardBackspaceIcon style={{ fontSize: 50 }} />}
          />
        </div>
        <div className="readmore-button">
          <Button
            onClick={readMoreClicked}
            variant="contained"
          >
            <Trans i18nKey="readMore">Read More</Trans>
          </Button>
        </div>
      </div>
      {props.children}
    </Container>
  );
}

ServiceContainer.propTypes = {
  /** Service content, to be placed inside the ServiceContainer. */
  children: PropTypes.element.isRequired,
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
  /** Style object for the MUI container. */
  sx: PropTypes.object,
};

export default ServiceContainer;
