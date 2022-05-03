import React, { useState, useEffect } from "react";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";
import MicOffIcon from "@mui/icons-material/MicOff";

import MessageIO from "./io";

const VoiceRecorder = ({
  maxLength = Infinity,
  handleFinishRecording,
  handleDiscardAudio,
}) => {
  maxLength;

  const [recorder, setRecorder] = useState(null);
  const [recordedFile, setRecordedFile] = useState(null);
  const [recordingStart, setRecordingStart] = useState(null);
  const [recordedLength, setRecordedLength] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(null);

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
        rec.addEventListener("start", () => setRecordingStart(new Date()));
        [("error", "stop")].forEach((evt) =>
          rec.addEventListener(evt, () => setRecordingStart(null))
        );
        rec.addEventListener("dataavailable", (e) => collectRecording(e.data));
        setRecorder(rec);
      })
      .catch((e) => {
        console.log("ERROR: " + e);
      });
  }, []);

  useEffect(() => {
    if (recordingStart)
      setRecordingTimer(
        setInterval(
          () =>
            setRecordedLength(Math.floor((new Date() - recordingStart) / 1000)),
          250
        )
      );
    else {
      setRecordedLength(null);
      clearInterval(recordingTimer);
    }
  }, [recordingStart]);

  const isRecording = recordingStart !== null;

  return (
    <Card className="voice-recorder">
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
          <>
            <IconButton onClick={() => recorder.stop()}>
              <StopIcon />
            </IconButton>
            <Typography className="recording-timer">
              {MessageIO.formatLength(recordedLength)}
            </Typography>
          </>
        )}

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
