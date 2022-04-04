import React from "react";

import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import i18n from "../../../../../i18n";

/**
 * Display a timestamp on the bottom-right corner.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const BottomRightTimestamp = ({ time }) => {
  const t = new Date(time);
  const timeStr = Intl.DateTimeFormat(i18n.language, {
    timeStyle: "short",
  }).format(t);
  const fullTimeStr = Intl.DateTimeFormat(i18n.language, {
    timeStyle: "medium",
    dateStyle: "long",
  }).format(t);
  return (
    <div className="timestamp">
      {/* invisible element to make room for the timestamp if needed */}
      <div className="timestamp-invisible-space">{timeStr}</div>

      {/* visible timestamp (bottom-right corner) */}
      <Tooltip title={fullTimeStr}>
        <div className="timestamp-visible">{timeStr}</div>
      </Tooltip>
    </div>
  );
};
BottomRightTimestamp.propTypes = {
  /** the time to display */
  time: PropTypes.instanceOf(Date).isRequired,
};

export default BottomRightTimestamp;
