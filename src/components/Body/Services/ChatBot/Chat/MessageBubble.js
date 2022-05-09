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
import MessageOption from "./MessageOption";

/**
 * Display a bubble with the contents of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const MessageBubble = ({
  message,
  participants,
  quotedMessage = null,
  handleSelectOption = null,
}) => {
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
    : [
        message.fileUrl && message.fileUrl.startsWith("/")
          ? process.env.REACT_APP_CHAT_URL + message.fileUrl
          : message.fileUrl,
        message.fileName,
        message.fileSize,
      ];

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

      {/* options */}
      {Boolean(message.options && message.options.length) && (
        <div>
          {message.options.map((o, i) => (
            <MessageOption
              option={o}
              key={"opt_" + i}
              handleClick={handleSelectOption}
            />
          ))}
        </div>
      )}

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

  /** function to be called when the user chooses one of the options
   * given by this message (or null to disable the button)
   */
  handleSelectOption: PropTypes.func,
};

export default MessageBubble;
