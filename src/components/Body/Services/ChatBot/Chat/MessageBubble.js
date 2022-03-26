import React from "react";

import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import QuotedMessage from "./QuotedMessage";
import { Message, MessageConditions } from "./data-structures";
import { Participant } from "../Lobby/data-structures";
import BottomRightTimestamp from "./BottomRightTimestamp";

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
}) => {
  const theme = useTheme();
  const received = message.condition === MessageConditions.RECEIVED;
  const s = {
    backgroundColor: received
      ? theme.palette.secondary.light
      : theme.palette.primary.dark,
    color: received ? "black" : "white",
  };

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

      {/* message text */}
      {message.text && <div className="message-text">{message.text}</div>}

      {/* timestamp */}
      <BottomRightTimestamp time={message.time} />
    </div>
  );
}

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
