import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Trans } from "react-i18next";
import MicIcon from "@mui/icons-material/Mic";
import { Message, MessageConditions, MessageTypes } from "./data-structures";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AttachedFile from "./AttachedFile";

/**
 * Display elements where the user can insert a message and send it.
 *
 * @category Services
 * @subcategory ChatBot
 * @component React.FC<MessageInputAreaPropTypes>
 */
const MessageInputArea = forwardRef(({ onSendMessage, limits = {} }, ref) => {
  const textFieldRef = useRef(null);
  useImperativeHandle(ref, () => ({
    /** Focus the text field
     *
     * @category Services
     * @subcategory ChatBot
     */
    focus() {
      textFieldRef.current.focus();
    },
  }));

  // text typed by the user
  const [typedText, setTypedText] = useState("");

  const [inputMessageType, setInputMessageType] = useState(MessageTypes.TEXT);

  // file attached by the user
  const [attachedFile, setAttachedFile] = useState(null);

  /**
   * Let the user choose any file to be attached to the message.
   */
  const chooseAttachment = () => {
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "*";
    elem.addEventListener("change", (e) => {
      if (e.target.files.length) {
        setInputMessageType(MessageTypes.ATTACHMENT);
        setAttachedFile(e.target.files[0]);
        inputMessageType;
      }
    });
    elem.click();
  };

  /**
   * Let the user choose any media file to be attached to the message.
   */
  const chooseMedia = () => {
    const types = {
      audio: MessageTypes.AUDIO,
      video: MessageTypes.VIDEO,
      image: MessageTypes.IMAGE,
    };
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "audio/*, image/*, video/*";
    elem.addEventListener("change", (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const type = types[file.type.split("/", 1)[0]];
        if (type !== undefined) {
          setAttachedFile(file);
          setInputMessageType(type);
        }
      }
    });
    elem.click();
  };

  /** If there is a message (typed, attachment inserted, etc.),
   * store its data in a {@link Message} instance; otherwise,
   * return `null`.
   *
   * @return a {@link Message} with the data the user inserted,
   * or `null` if the fields are blank
   */
  function collectMessage() {
    const text = typedText.trim();
    if (!text) return null;
    return new Message(
      MessageTypes.TEXT,
      MessageConditions.SENDING,
      new Date(),
      uuidv4().replace(/-/g, ""),
      undefined,
      text
    );
  }

  /**
   * If there is a message (typed, attachment inserted, etc.),
   * collect its data in  a {@link Message} instance, call
   * the callback function and clear the fields.
   */
  function sendMessage() {
    const message = collectMessage();
    if (message === null) return;
    setTypedText("");
    onSendMessage(message);
  }

  const sendLbl = <Trans i18nKey="sendMessage">Send</Trans>;
  const insertMediaLbl = <Trans i18nKey="insertMedia">Insert media</Trans>;
  const insertFileLbl = <Trans i18nKey="insertAttachment">Insert file</Trans>;
  const insertVoiceLbl = <Trans i18nKey="recordVoice">Record voice</Trans>;

  const enableAudio = Boolean(limits.MAX_AUDIO_SIZE && limits.MAX_AUDIO_LENGTH);
  const enableVideo = Boolean(
    limits.MAX_VIDEO_SIZE &&
      limits.MAX_VIDEO_LENGTH &&
      limits.MAX_VIDEO_RESOLUTION
  );
  const enableImage = Boolean(
    limits.MAX_IMAGE_SIZE && limits.MAX_IMAGE_RESOLUTION
  );
  const enableMedia = Boolean(enableAudio || enableVideo || enableImage);
  const enableVoice = Boolean(
    limits.MAX_VOICE_LENGTH && limits.MAX_VOICE_LENGTH
  );
  const enableAttachment = Boolean(limits.MAX_ATTACHMENT_SIZE);

  return (
    <>
      <Stack>
        {Boolean(attachedFile) && (
          <AttachedFile
            file={attachedFile}
            messageType={inputMessageType}
            handleRemoveFile={() => {
              setAttachedFile(null);
              setInputMessageType(MessageTypes.TEXT);
            }}
          />
        )}

        <TextField
          inputRef={textFieldRef}
          value={typedText}
          fullWidth
          multiline
          minRows={4}
          label={<Trans i18nKey="typeMessage">Type a message</Trans>}
          variant="outlined"
          sx={{ bgcolor: "white" }}
          onChange={(e) => setTypedText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage(typedText.trim());
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Stack>
                  {enableMedia && (
                    <Tooltip title={insertMediaLbl}>
                      <span>
                        <IconButton
                          aria-label={insertMediaLbl}
                          // disabled={}
                          onClick={chooseMedia}
                          onMouseDown={(e) => e.preventDefault()} // don't lose focus
                        >
                          <PermMediaIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                  {enableAttachment && (
                    <Tooltip title={insertFileLbl}>
                      <span>
                        <IconButton
                          aria-label={insertFileLbl}
                          // disabled={}
                          onClick={chooseAttachment}
                          onMouseDown={(e) => e.preventDefault()} // don't lose focus
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </Stack>
                {(typedText.trim() || !enableVoice) && (
                  <Tooltip title={sendLbl}>
                    <span>
                      <IconButton
                        aria-label={sendLbl}
                        disabled={!typedText.trim()}
                        onClick={() => sendMessage(typedText.trim())}
                        onMouseDown={(e) => e.preventDefault()} // don't lose focus
                      >
                        <SendIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {!typedText.trim() && enableVoice && (
                  <Tooltip title={insertVoiceLbl}>
                    <span>
                      <IconButton
                        aria-label={insertVoiceLbl}
                        // disabled={}
                        // onClick={}
                      >
                        <MicIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
});

const MessageInputAreaPropTypes = {
  /** called when a message is sent */
  onSendMessage: PropTypes.func.isRequired,

  /** chat limits */
  limits: PropTypes.object,
};
MessageInputArea.propTypes = MessageInputAreaPropTypes;
MessageInputArea.displayName = "MessageInputArea";

export default MessageInputArea;
