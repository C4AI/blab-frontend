import React, { Suspense } from "react";

import PropTypes from "prop-types";
import { TwitterFollowButton } from 'react-twitter-embed'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

/** Display the latest tweets made by a Twitter account.
  * 
  * @category Services
  * @subcategory Reporter
  * @component
  * */
const TwitterBot = ({ username, loadingMessage = "" }) => {
  return (
    <>
      <Suspense fallback={<div>{ loadingMessage }</div>}>
        <TwitterFollowButton
          screenName={username}
        />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={username}
          options={{height: 400}}
          noFooter={true}
        />
      </Suspense>
    </>
  );
}

TwitterBot.propTypes = {
  /** Twitter username */
  username: PropTypes.string.isRequired,

  /** Message to be shown while timeline is loading */
  loadingMessage: PropTypes.object,
};

export default TwitterBot;
