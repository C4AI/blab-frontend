import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MessageIO from "./io";

/**
 * Display an image that is part of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
export const ImageDisplay = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={url} className="embedded-media" />
    </a>
  );
};

ImageDisplay.propTypes = {
  /** URL of the image */
  url: PropTypes.string.isRequired,
};

/**
 * Present an audio file that is part of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
export const AudioDisplay = ({ url }) => {
  return <audio src={url} controls className="embedded-media" />;
};

AudioDisplay.propTypes = {
  /** URL of the audio file */
  url: PropTypes.string.isRequired,
};

/**
 * Display a video file that is part of a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
export const VideoDisplay = ({ url }) => {
  return <video src={url} controls className="embedded-media" />;
};

VideoDisplay.propTypes = {
  /** URL of the video file */
  url: PropTypes.string.isRequired,
};

/**
 * Display a button to download a file attached to a message.
 *
 * @category Services
 * @subcategory ChatBot
 * @component
 */
export const AttachmentDisplay = ({ url, fileName, size }) => {
  // this can probably be presented in a better way;
  // also, the download does not work if the file is hosted on the server
  // in development environments because React proxy does not forward
  // the request
  return (
    <a href={url} download={fileName} target="_blank" rel="noreferrer">
      <Card>
        <CardMedia>
          <DownloadIcon />
        </CardMedia>
        <CardContent>
          <Typography variant="h7" component="div">
            {fileName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {MessageIO.formatSize(size)}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};

AttachmentDisplay.propTypes = {
  /** URL of the file */
  url: PropTypes.string.isRequired,

  /** file name */
  fileName: PropTypes.string.isRequired,

  /** file size in bytes */
  size: PropTypes.number,
};
