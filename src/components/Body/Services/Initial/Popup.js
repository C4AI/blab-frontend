import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from '@mui/material'
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
        <Box
          component="img"
          sx={{
            height: {
              xs: 211,
              md: 211*1.25,
              lg: 212*1.5,
            },
            width: {
              xs: 212,
              md: 212*1.25,
              lg: 212*1.5,
            },
            flex: 1,
            verticalAlign: "text-top"
          }}
          src={require("../../../../images/Imagem_Texto_Introdutorio.png")}
        />
        <Typography>
          <Trans i18nKey="popupText">Lorem Ipsum</Trans>
        </Typography>
      </div>
    </div>
  );
};

Popup.propTypes = {
  /** Popup visibility setter. Used when closing the modal popup. */
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
