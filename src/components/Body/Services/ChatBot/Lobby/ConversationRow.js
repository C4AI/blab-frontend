import React from "react";

import { ListItemButton, ListItemText, Radio } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Display a row containing a selectable conversation.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const ConversationRow = ({
  conversation,
  isSelected,
  handleSelect,
}) => {
  return (
    <ListItemButton selected={isSelected} onClick={() => handleSelect(true)}>
      <Radio
        checked={isSelected}
        onChange={(e) => handleSelect(e.target.checked)}
      />
      <ListItemText primary={conversation.name} />
    </ListItemButton>
  );
}

ConversationRow.propTypes = {
  /** conversation to be displayed */
  conversation: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,

  /** whether the conversation is selected */
  isSelected: PropTypes.bool,

  /** function called when the user (de-)selects the conversation
   * (it is called with a boolean argument indicating if it was
   * selected)
   */
  handleSelect: PropTypes.func,
};

export default ConversationRow;
