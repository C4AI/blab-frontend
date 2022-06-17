import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Fab } from '@mui/material'
import { Trans } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';

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
        <div className="box-header">
          <div className="close-button">
            <Fab
              style={{boxShadow: "none"}}
              size="small"
              onClick={handleClose}
              variant="outlined"
            >
              <CloseIcon style={{ fontSize: 20, color: "black" }} />
            </Fab>
          </div>
        </div>
        <div className="box-content">
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
            float: {
              xs: "none",
              md: "left"
            },
            verticalAlign: "text-top",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          src={require("../../../../images/Imagem_Texto_Introdutorio.png")}
        />
        <Typography
          sx={{
            textAlign: "distribute",
            fontSize: 20,
          }}
        >
          <Trans i18nKey="popupText">Lorem Ipsum</Trans>
        </Typography>
        </div>
        
      </div>
    </div>
  );
};

Popup.propTypes = {
  /** Popup visibility setter. Used when closing the modal popup. */
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
