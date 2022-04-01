import React from "react";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";

/** Display the latest tweets made by a Twitter account.
  * 
  * @category Services
  * @subcategory Reporter
  * @component
  * */
const TwitterBot = ({ username, loadingMessage = "" }) => {
  const { i18n } = useTranslation();
  return (
    // See: https://developer.twitter.com/en/docs/twitter-for-websites/timelines/overview
    <>
      <br />
      <a
        className="twitter-follow-button"
        data-lang={i18n.language}
        href={`https://twitter.com/${username}`}
      >
        {username}
      </a>
      <br />
      <a
        className="twitter-timeline"
        data-lang={i18n.language}
        data-width="500"
        data-height="500"
        data-dnt="true"
        data-chrome="nofooter"
        href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
      >
        {loadingMessage}
      </a>
    </>
  );
}

TwitterBot.propTypes = {
  /** Twitter username */
  username: PropTypes.string.isRequired,

  /** Message to be shown while timeline is loading */
  loadingMessage: PropTypes.string,
};

export default TwitterBot;