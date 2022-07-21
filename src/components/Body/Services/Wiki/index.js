import React, { useState } from "react";
import PropTypes from "prop-types";

import ServiceContainer from "../../ServiceContainer";
import ServiceLoading from "../../ServiceLoading";

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
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => {
    setIsLoading(false);
  }

  return (
    <ServiceContainer
      setService={setService}
      sx={{
        minWidth: "80vw",
        minHeight: "80vh"
      }}
    >
      <>
        {isLoading &&
          <div className="loading">
            <ServiceLoading/>
          </div>
        }
        {isMobile
          ? <iframe src="https://c2dt02.duckdns.org/w/" className="wiki-iframe" onLoad={onLoad} frameBorder="0"/>
          : <iframe src="https://c2dt02.duckdns.org/w/" className="wiki-iframe" onLoad={onLoad} frameBorder="0"/>
        }
      </>
    </ServiceContainer>
  );
};

Wiki.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Wiki;
