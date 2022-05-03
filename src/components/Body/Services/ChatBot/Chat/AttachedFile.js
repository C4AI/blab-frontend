import React from "react";

import PropTypes from "prop-types";

import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import MessageIO from "./io";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";
import { MessageTypes } from "./data-structures";
import { DeleteForever } from "@material-ui/icons";

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
          <CardMedia disabled component={icon} style={{ opacity: "40%" }} />

          {messageType === MessageTypes.IMAGE && (
            <img className="embedded-media" src={URL.createObjectURL(file)} />
          )}

          {(messageType === MessageTypes.AUDIO ||
            messageType === MessageTypes.VOICE) && (
            <audio
              className="embedded-media"
              src={URL.createObjectURL(file)}
              controls
              preload="auto"
            />
          )}

          {messageType === MessageTypes.VIDEO && (
            <video
              className="embedded-media"
              src={URL.createObjectURL(file)}
              controls
              controlsList="nodownload noremoteplayback"
              playsInline
              preload="auto"
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {messageType !== MessageTypes.VOICE && (
              <a href={URL.createObjectURL(file)} download={file.name}>
                <Typography>{file.name}</Typography>
              </a>
            )}
            <Typography variant="body2" color="text.secondary">
              {MessageIO.formatSize(file.size)}
            </Typography>
          </Box>
        </Card>
      </div>

      {/* "x" button */}
      {handleRemoveFile && (
        <IconButton className="close" onClick={() => handleRemoveFile()}>
          <DeleteForever />
        </IconButton>
      )}
    </div>
  );
};

AttachedFile.propTypes = {
  /** file whose metadata will be display */
  file: PropTypes.instanceOf(Blob),

  /** type of the message */
  messageType: PropTypes.string,

  /** function to be called when the user removes the file by clicking "x"
   * (if the function is not present, the "x" button is not shown)
   */
  handleRemoveFile: PropTypes.func,
};

export default AttachedFile;
