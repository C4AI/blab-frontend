import React, { useState, useEffect } from "react";
import { Card, IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";

import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";
import MicOffIcon from "@mui/icons-material/MicOff";

const VoiceRecorder = ({
  maxLength = Infinity,
  handleFinishRecording,
  handleDiscardAudio,
}) => {
  maxLength;

  /*eslint no-unused-vars: "off" */

  const [recorder, setRecorder] = useState(null);
  const [recordedFile, setRecordedFile] = useState(null);
  const [isRecording, setRecording] = useState(false);

  const collectRecording = function (data) {
    if (recordedFile) return;
    const blob = new Blob([data]);
    setRecordedFile(blob);
    handleFinishRecording(blob);
    if (recorder && recorder.state == "recording") recorder.stop();
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const rec = new MediaRecorder(stream);
        ["start", "resume"].forEach((evt) =>
          rec.addEventListener(evt, () => setRecording(true))
        );
        ["error", "pause", "stop"].forEach((evt) =>
          rec.addEventListener(evt, () => setRecording(false))
        );
        rec.addEventListener("dataavailable", (e) => collectRecording(e.data));
        setRecorder(rec);
      })
      .catch((e) => {
        console.log("ERROR: " + e);
      });
  }, []);

  const blobURL = recordedFile ? URL.createObjectURL(recordedFile) : null;

  return (
    <Card>
      <Stack direction="row" spacing={2}>
        {!recordedFile && !isRecording && (
          <IconButton
            disabled={!recorder}
            onClick={() =>
              recorder.start(isFinite(maxLength) ? 1000 * maxLength : undefined)
            }
          >
            {recorder ? <FiberManualRecordRoundedIcon /> : <MicOffIcon />}
          </IconButton>
        )}

        {isRecording && (
          <IconButton onClick={() => recorder.stop()}>
            <StopIcon />
          </IconButton>
        )}

        {Boolean(recordedFile) && <audio controls src={blobURL} />}

        <div style={{ flex: 1 }}></div>

        {!recordedFile && (
          <IconButton onClick={handleDiscardAudio}>
            <CloseIcon />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};
VoiceRecorder.propTypes = {
  /** maximum length (in seconds) */
  maxLength: PropTypes.number,

  /** function to be called when an audio recording is completed
   * and ready to be sent
   */
  handleFinishRecording: PropTypes.func.isRequired,

  /** function to be called when the user discards the audio message
   * by clicking "x" or the rubbish bin icon
   */
  handleDiscardAudio: PropTypes.func.isRequired,
};
export default VoiceRecorder;
