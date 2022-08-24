import React from "react";
import PropTypes from "prop-types";

import { Container } from "@mui/material";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useTranslation, Trans } from "react-i18next";

import "./ServiceContainer.css";

/**
 *  Container to wrap services. It has a Return button and a ReadMore button.
 *
 *  @category Basic
 *  @component
 */
const ServiceContainer = (props) => {
  const returnClicked = () => {
    props.setService("Initial");
  };

  const readMoreClicked = () => {
    window.open("https://c4ai.inova.usp.br/research/#KEML");
  };

  const { t } = useTranslation();
  const returnLabel = t("returnLabel");
  const readMoreLabel = t("readMoreLabel");

  return(
    <Container
      className="service-container"
      maxWidth="xs"
      sx={props.sx}
    >
      <div className="container-header">
        <div className="return-button">
          <Button
            onClick={returnClicked}
            startIcon={<KeyboardBackspaceIcon style={{ fontSize: 50, color: "white" }} />}
            aria-label={returnLabel}
          />
        </div>
        <div
          className="readmore-button"
        >
          <Button
            onClick={readMoreClicked}
            variant="contained"
            style={{
              backgroundColor: "white",
            }}
            aria-label={readMoreLabel}
          >
            <Trans i18nKey="readMore">Read More</Trans>
          </Button>
        </div>
      </div>
      <div role="main">
        {props.children}
      </div>
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
