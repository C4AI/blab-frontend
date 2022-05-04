import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";

const Popup = ({ handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <Trans i18nKey="popupText">Lorem Ipsum</Trans>
      </div>
    </div>
  );
};

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
