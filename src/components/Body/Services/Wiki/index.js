import React from "react";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Container } from "@mui/material";

import "./Wiki.css";
import { useTranslation } from "react-i18next";

/**
 *  Wiki service. Displays an interactive frame of the BLAB wiki.
 *
 *  @category Services
 *  @subcategory Wiki
 *  @component
 */
const Wiki = ({ setService }) => {
  const handleClick = () => {
    setService("Initial");
  };

  useTranslation();
  return (
    <div className="wiki">
      <Container
        className="wiki-container"
        component="main"
        maxWidth="xs"
      >
        <div className="wiki-container-header">
          <div className="wiki-return-button">
            <Button
              onClick={handleClick}
              startIcon={<KeyboardBackspaceIcon style={{ fontSize: 50 }} />}
            />
          </div>
        </div>
        <iframe src="http://pt.wikipedia.org" className="wiki-iframe"/>
      </Container>
    </div>
  );
};

Wiki.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Wiki;
