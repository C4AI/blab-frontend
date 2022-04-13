import React from "react";
import PropTypes from "prop-types";

import ServiceContainer from "../../ServiceContainer";

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
  useTranslation();
  return (
    <ServiceContainer
      setService={setService}
      sx={{
        minWidth: "80vw",
        minHeight: "80vh"
      }}
    >
      <iframe src="http://pt.wikipedia.org" className="wiki-iframe" />
    </ServiceContainer>
  );
};

Wiki.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Wiki;
