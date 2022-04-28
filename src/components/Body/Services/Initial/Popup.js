import React from "react";
import PropTypes from "prop-types";

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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
};

Popup.propTypes = {
  /** Popup visibility setter. Used when closing the modal popup. */
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
