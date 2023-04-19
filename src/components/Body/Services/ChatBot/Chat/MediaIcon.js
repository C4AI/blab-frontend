import React from "react";

import PropTypes from "prop-types";

import { CardMedia, Tooltip } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";

import { MessageTypes } from "./data-structures";
import { Trans } from "react-i18next";

/**
 * Display a small icon corresponding to the message type
 * when it contains an attached file.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const MediaIcon = ({ messageType }) => {
  const [icon, iconKey, iconFallbackText] = {
    [MessageTypes.IMAGE]: [ImageIcon, "messageTypeImage", "Image"],
    [MessageTypes.VIDEO]: [VideocamIcon, "messageTypeVideo", "Video"],
    [MessageTypes.AUDIO]: [AudioFileIcon, "messageTypeAudio", "Audio"],
    [MessageTypes.VOICE]: [MicTwoToneIcon, "messageTypeVoice", "Voice"],
    [MessageTypes.ATTACHMENT]: [
      AttachmentIcon,
      "messageTypeAttachment",
      "Attachment",
    ],
  }[messageType] || [null, "", ""];

  return (
    Boolean(icon) && (
      <Tooltip
        placement="bottom-start"
        title={<Trans i18nKey={iconKey}>{iconFallbackText}</Trans>}
      >
        <span>
          <CardMedia disabled component={icon} style={{ opacity: "40%" }} />
        </span>
      </Tooltip>
    )
  );
};

MediaIcon.propTypes = {
  /** message type (see {@link MessageTypes}) */
  messageType: PropTypes.string.isRequired,
};

export default MediaIcon;
