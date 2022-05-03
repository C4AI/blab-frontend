import React from "react";

import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import QuotedMessage from "./QuotedMessage";
import { Message, MessageConditions, MessageTypes } from "./data-structures";
import {
  ImageDisplay,
  AudioDisplay,
  VideoDisplay,
  AttachmentDisplay,
} from "./Media";
import { Participant } from "../Lobby/data-structures";
import BottomRightTimestamp from "./BottomRightTimestamp";

/**
 * Display a bubble with the contents of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const MessageBubble = ({ message, participants, quotedMessage = null }) => {
  const theme = useTheme();
  const received = message.condition === MessageConditions.RECEIVED;
  const s = {
    backgroundColor: received
      ? theme.palette.secondary.light
      : theme.palette.primary.dark,
    color: received ? "black" : "white",
  };

  const [fileUrl, fileName, fileSize] = message.rawFile
    ? [
        URL.createObjectURL(message.rawFile),
        message.rawFile.name,
        message.rawFile.size,
      ]
    : [message.fileUrl, message.fileName, message.fileSize];

  return (
    <div data-msg-id={"msg_" + message.id} className="message-bubble" style={s}>
      {/* sender (only if it is someone else) */}
      {received && (
        <div className="message-sender">
          {participants[message.senderId].name}
        </div>
      )}

      {/* quoted message */}
      <QuotedMessage message={quotedMessage} participants={participants} />

      {/* image */}
      {message.type == MessageTypes.IMAGE && <ImageDisplay url={fileUrl} />}

      {/* audio */}
      {(message.type == MessageTypes.AUDIO ||
        message.type == MessageTypes.VOICE) && <AudioDisplay url={fileUrl} />}

      {/* video */}
      {message.type == MessageTypes.VIDEO && <VideoDisplay url={fileUrl} />}

      {/* attachment */}
      {message.type == MessageTypes.ATTACHMENT && (
        <AttachmentDisplay url={fileUrl} fileName={fileName} size={fileSize} />
      )}

      {/* message text */}
      {message.text && <div className="message-text">{message.text}</div>}

      {/* timestamp */}
      <BottomRightTimestamp time={message.time} />
    </div>
  );
};

MessageBubble.propTypes = {
  /** the message to be displayed */
  message: PropTypes.instanceOf(Message).isRequired,

  /** conversation participants (id -> Participant) */
  participants: PropTypes.objectOf(PropTypes.instanceOf(Participant).isRequired)
    .isRequired,

  /** the quoted message, if any */
  quotedMessage: PropTypes.instanceOf(Message),
};

export default MessageBubble;
