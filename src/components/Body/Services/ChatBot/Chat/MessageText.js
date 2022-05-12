import React from "react";

import PropTypes from "prop-types";

import LinkifyIt from "linkify-it";

/** Display the text part of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const MessageText = ({ text, createLinks = false }) => {
  const linkify = (text) => {
    const parts = [];
    let pos = 0;
    (LinkifyIt().match(text) || []).forEach((match) => {
      if (match.index > pos) parts.push(text.substring(pos, match.index));
      const a = <a href={match.url}>{match.raw}</a>;
      parts.push(a);
      pos = match.lastIndex;
    });
    if (text.length > pos) parts.push(text.substring(pos));
    return parts;
  };
  const textToDisplay = createLinks ? linkify(text) : text;
  return Boolean(text) && <div className="message-text">{textToDisplay}</div>;
};

MessageText.propTypes = {
  /** the message text to be displayed */
  text: PropTypes.string,

  /** whether URLs should be detected and converted into links */
  createLinks: PropTypes.bool,
};

export default MessageText;
