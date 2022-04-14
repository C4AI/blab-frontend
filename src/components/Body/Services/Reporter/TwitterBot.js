import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ServiceLoading from "../../ServiceLoading";
import { TwitterFollowButton } from "react-twitter-embed";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import i18n from "../../../../i18n";

import { Alert } from "@mui/material";

import "./Reporter.css";

/**
 * Detects the usage of an ad blocking plugin.
 *
 * @category Services
 * @subcategory Reporter
 * @function
 */

async function detectAdBlock() {
  let adBlockEnabled = false
  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  try {
    await fetch(new Request(googleAdUrl)).catch(() => adBlockEnabled = true)
  } catch (e) {
    adBlockEnabled = true
  }
  return adBlockEnabled;
}

/** Display the latest tweets made by a Twitter account.
 *
 * @category Services
 * @subcategory Reporter
 * @component
 * */
const TwitterBot = ({ username }) => {
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);
  useEffect(async () => {
    setAdBlockEnabled(await detectAdBlock());
  }, [])
  return (
    <>
      {adBlockEnabled
        ?
          <Alert sx={{ marginTop:"15%"}} severity="error">Por favor, desabilite o bloqueador de anúncios para poder visualizar este serviço.</Alert>
        :
          <>
            <TwitterFollowButton
              className="twitter-follow-button"
              screenName={username}
            />
            <TwitterTimelineEmbed
              className="twitter-timeline"
              sourceType="profile"
              options={{
                height: "75vh",
              }}
              screenName={username}
              noFooter={true}
              lang={i18n.language}
              placeholder={<ServiceLoading/>}
            />
          </>
      }
    </>
  );
};

TwitterBot.propTypes = {
  /** Twitter username */
  username: PropTypes.string.isRequired,

  /** Message to be shown while timeline is loading */
  loadingMessage: PropTypes.object,
};

export default TwitterBot;
