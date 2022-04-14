import React, { Suspense } from "react";
import PropTypes from "prop-types";

import ServiceContainer from "../../ServiceContainer";
import BLABReporter from "./BlabReporterTwitterBot";
import { useTranslation } from "react-i18next";

import "./Reporter.css";

/**
 *  Reporter service. Currently displays the profile's twitter
 *  feed with, a Follow button and the number of followers
 *
 *  @category Services
 *  @subcategory Reporter
 *  @component
 */
const Reporter = ({ setService }) => {
  useTranslation();
  return (
      <ServiceContainer setService={setService}>
        <Suspense>
          <BLABReporter />
        </Suspense>
      </ServiceContainer>
  );
};

Reporter.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default Reporter;
