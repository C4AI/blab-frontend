import React from "react";

import PropTypes from "prop-types";
import { Trans } from "react-i18next";

import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";
import { DeleteForever } from "@material-ui/icons";

import MessageIO from "./io";

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
  handleSend = null,
}) => {
  if (!file) return null;
  const [icon, iconKey, iconFallbackText] = {
    [MessageTypes.IMAGE]: [ImageIcon, "messageTypeImage", "Image"],
    [MessageTypes.VIDEO]: [VideocamIcon, "messageTypeVideo", "Video"],
    [MessageTypes.AUDIO]: [AudioFileIcon, "messageTypeAudio", "Audio"],
    [MessageTypes.VOICE]: [MicTwoToneIcon, "messageTypeVoice", "Voice"],
  }[messageType] || [AttachmentIcon, "messageTypeAttachment", "Attachment"];

  const sendLbl = <Trans i18nKey="sendMessage">Send</Trans>;

  return (
    <div className="attached-file">
      <div className="file-data">
        <Card
          sx={{ display: "flex", flexDirection: "column" }}
          style={{ opacity: "80%" }}
        >
          <Tooltip
            placement="bottom-start"
            title={<Trans i18nKey={iconKey}>{iconFallbackText}</Trans>}
          >
            <span>
              <CardMedia disabled component={icon} style={{ opacity: "40%" }} />
            </span>
          </Tooltip>

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
        <Tooltip
          placement="top"
          title={
            messageType === MessageTypes.VOICE ? (
              <Trans i18nKey="discardVoiceRecording">Discard recording</Trans>
            ) : messageType === MessageTypes.ATTACHMENT ? (
              <Trans i18nKey="removeAttachment">Remove attachment</Trans>
            ) : (
              <Trans i18nKey="removeMedia">Remove media file</Trans>
            )
          }
        >
          <span>
            <IconButton className="close" onClick={() => handleRemoveFile()}>
              <DeleteForever />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {handleSend && (
        <Tooltip title={sendLbl}>
          <span>
            <IconButton
              aria-label={sendLbl}
              onClick={() => handleSend()}
              onMouseDown={(e) => e.preventDefault()} // don't lose focus
            >
              <SendIcon />
            </IconButton>
          </span>
        </Tooltip>
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

  /** function to be called when the user presses the button to send
   * the message
   * (if the function is not present, the Send button is not shown)
   */
  handleSend: PropTypes.func,
};

export default AttachedFile;
