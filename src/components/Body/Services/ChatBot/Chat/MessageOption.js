import React from "react";

import PropTypes from "prop-types";

import { Chip } from "@mui/material";

/**
 * Display an option that the user can click instead of typing.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const MessageOption = ({ option, handleClick = null }) => {
  return (
    <Chip
      size="small"
      label={option}
      variant="outlined"
      disabled={handleClick === null}
      clickable
      onClick={() => handleClick(option)}
    />
  );
};

MessageOption.propTypes = {
  /** text of the option */
  option: PropTypes.string.isRequired,

  /** function to be called when the user clicks this option
   * (if null, the option is disabled)
   */
  handleClick: PropTypes.func,
};

export default MessageOption;
