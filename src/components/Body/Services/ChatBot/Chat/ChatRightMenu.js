import React from "react";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation, Trans } from "react-i18next";
import PropTypes from "prop-types";

/**
 * Display the top-right corner menu in a conversation.
 * Currently, it only has one option ("leave").
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
const ChatRightMenu = ({ onTrigger }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const [changeNameIsOpen, setChangeNameIsOpen] = useState(false);

  const [typedParticipantName, setTypedParticipantName] = useState("");

  function changeParticipantName(name) {
    setChangeNameIsOpen(false);
    if (name === null) return;
    name = name.trim();
    if (name) onTrigger("changeMyName", { name });
  }

  const { t } = useTranslation();
  const rightMenuButtonLabel = t("rightMenuButtonLabel");

  return (
    <div>
      <IconButton
        id="right-menu-button"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        aria-label={rightMenuButtonLabel}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem
          key="changeParticipantName"
          onClick={() => {
            setMenuAnchor(null);
            setChangeNameIsOpen(true);
          }}
        >
          <Trans i18nKey="changeParticipantName">Change my name</Trans>
        </MenuItem>
        <MenuItem
          key="leave"
          onClick={() => {
            onTrigger("leave");
            setMenuAnchor(null);
          }}
        >
          <Trans i18nKey="leaveConversation">Leave</Trans>
        </MenuItem>
      </Menu>
      <Dialog open={changeNameIsOpen} fullWidth>
        <DialogTitle>
          <Trans i18nKey="changeParticipantName">Change my name</Trans>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => changeParticipantName(null)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContentText></DialogContentText>
        <Container>
          <TextField
            value={typedParticipantName}
            onChange={(e) => setTypedParticipantName(e.target.value)}
            autoFocus
            id="myParticipantName"
            label={<Trans i18nKey="yourName">Your name</Trans>}
            type="text"
            variant="standard"
            fullWidth
          />
        </Container>
        <DialogActions>
          <Button onClick={() => changeParticipantName(typedParticipantName)}>
            Cancel
          </Button>
          <Button onClick={() => changeParticipantName(typedParticipantName)}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChatRightMenu.propTypes = {
  /** function called when an action is triggered
   * (currently, only "leave" and "changeMyName" are available)
   */
  onTrigger: PropTypes.func,
};

export default ChatRightMenu;
