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
  Alert,
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
import VoiceRecorder from "./VoiceRecorder";
import MessageIO from "./io";

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

  // alerts
  const [alertComponent, setAlertComponent] = useState(null);

  /** Show an error message letting the user know that the selected file is too large. */
  const showFileTooLargeError = (maxSize) => {
    const formattedMaxSize = MessageIO.formatSize(maxSize);
    const elem = (
      <Trans i18nKey="fileTooLarge" maxSize={formattedMaxSize}>
        Files larger than <b>{{ maxSize: formattedMaxSize }}</b> are not
        accepted.
      </Trans>
    );
    setAlertComponent(elem);
  };

  /**
   * Let the user choose any file to be attached to the message.
   */
  const chooseAttachment = () => {
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "*";
    elem.addEventListener("change", (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        if (file.size > limits.MAX_ATTACHMENT_SIZE) {
          showFileTooLargeError(limits.MAX_ATTACHMENT_SIZE);
          return;
        }
        setAlertComponent(null);
        setInputMessageType(MessageTypes.ATTACHMENT);
        setAttachedFile(file);
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
    const maxSizes = {
      [MessageTypes.AUDIO]: limits.MAX_AUDIO_SIZE,
      [MessageTypes.VIDEO]: limits.MAX_VIDEO_SIZE,
      [MessageTypes.IMAGE]: limits.MAX_IMAGE_SIZE,
    };
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "audio/*, image/*, video/*";
    elem.addEventListener("change", (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const type = types[file.type.split("/", 1)[0]];
        if (type === undefined) return;
        const maxSize = maxSizes[type];
        if (file.size > maxSize) {
          showFileTooLargeError(maxSize);
          return;
        }
        setAlertComponent(null);
        setAttachedFile(file);
        setInputMessageType(type);
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
    if (!text && !attachedFile) return null;
    return new Message(
      inputMessageType,
      MessageConditions.SENDING,
      new Date(),
      uuidv4().replace(/-/g, ""),
      undefined,
      inputMessageType !== MessageTypes.VOICE ? text : "",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      attachedFile
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
    setInputMessageType(MessageTypes.TEXT);
    setTypedText("");
    setAttachedFile(null);
    onSendMessage(message);
  }

  const sendLbl = <Trans i18nKey="sendMessage">Send</Trans>;
  const insertMediaLbl = <Trans i18nKey="insertMedia">Insert media</Trans>;
  const insertFileLbl = <Trans i18nKey="insertAttachment">Insert file</Trans>;
  const insertVoiceLbl = <Trans i18nKey="recordVoice">Record voice</Trans>;

  const enableAudio =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(limits.MAX_AUDIO_SIZE);
  const enableVideo =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(limits.MAX_VIDEO_SIZE);
  const enableImage =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(limits.MAX_IMAGE_SIZE);
  const enableMedia =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(enableAudio || enableVideo || enableImage);
  const enableVoice =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(
      limits.MAX_VOICE_SIZE &&
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
    );
  const enableAttachment =
    !attachedFile &&
    inputMessageType !== MessageTypes.VOICE &&
    Boolean(limits.MAX_ATTACHMENT_SIZE);
  const enableTextField = inputMessageType !== MessageTypes.VOICE;

  return (
    <>
      <Stack>
        <div>
          {Boolean(alertComponent) && (
            <Alert severity="error" onClose={() => setAlertComponent(null)}>
              {alertComponent}
            </Alert>
          )}
        </div>

        {Boolean(attachedFile) && (
          <AttachedFile
            file={attachedFile}
            messageType={inputMessageType}
            handleSend={
              inputMessageType === MessageTypes.VOICE ? sendMessage : null
            }
            handleRemoveFile={() => {
              setAttachedFile(null);
              setInputMessageType(MessageTypes.TEXT);
            }}
          />
        )}

        {inputMessageType === MessageTypes.VOICE && (
          <VoiceRecorder
            handleFinishRecording={(file) => setAttachedFile(file)}
            handleDiscardAudio={() => {
              setAttachedFile(null);
              setInputMessageType(MessageTypes.TEXT);
            }}
          />
        )}

        {inputMessageType !== MessageTypes.VOICE && (
          <TextField
            inputRef={textFieldRef}
            value={typedText}
            fullWidth
            multiline
            disabled={!enableTextField}
            minRows={4}
            label={
              enableTextField && (
                <Trans i18nKey="typeMessage">Type a message</Trans>
              )
            }
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
                          disabled={!typedText.trim() && !attachedFile}
                          onClick={() => sendMessage()}
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
                          onClick={() =>
                            setInputMessageType(MessageTypes.VOICE)
                          }
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
        )}
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
