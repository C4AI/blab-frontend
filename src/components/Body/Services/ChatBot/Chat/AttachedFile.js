import React from "react";

import PropTypes from "prop-types";

import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageIO from "./io";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";
import { MessageTypes } from "./data-structures";

/**
 * Display name and size of an attached file.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const AttachedFile = ({
  file,
  messageType = null,
  handleRemoveFile = null,
}) => {
  if (!file) return null;
  const icon =
    {
      [MessageTypes.IMAGE]: ImageIcon,
      [MessageTypes.VIDEO]: VideocamIcon,
      [MessageTypes.AUDIO]: AudioFileIcon,
      [MessageTypes.VOICE]: MicTwoToneIcon,
    }[messageType] || AttachmentIcon;
  return (
    <div className="attached-file">
      <div className="file-data">
        <Card
          sx={{ display: "flex", flexDirection: "column" }}
          style={{ opacity: "80%" }}
        >
          <CardMedia component={icon} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{file.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {MessageIO.formatSize(file.size)}
            </Typography>
          </Box>
        </Card>
      </div>

      {/* "x" button */}
      {handleRemoveFile && (
        <IconButton className="close" onClick={() => handleRemoveFile()}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
};

AttachedFile.propTypes = {
  /** file whose metadata will be display */
  file: PropTypes.instanceOf(File),

  /** type of the message */
  messageType: PropTypes.string,

  /** function to be called when the user removes the file by clicking "x"
   * (if the function is not present, the "x" button is not shown)
   */
  handleRemoveFile: PropTypes.func,
};

export default AttachedFile;
