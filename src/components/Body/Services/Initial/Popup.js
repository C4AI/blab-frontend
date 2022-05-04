import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";

/**
 *  Modal popup with explanation and information about the website.
 *
 *  @category Basic
 *  @component
 */

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
  /** Popup visibility setter. Used when closing the modal popup. */
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
