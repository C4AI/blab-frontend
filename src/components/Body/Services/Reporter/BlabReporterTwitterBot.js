import React from "react";
import TwitterBot from "./TwitterBot";
import { Trans } from "react-i18next";

/** Display the latest tweets made by BLAB Reporter.
  * 
  * @category Services
  * @subcategory Reporter
  * @component
  * */
const BLABReporter = () => {
  const loadingMsg = (
    <Trans i18nKey="loadingReporter">Loading tweets by BLAB Reporter</Trans>
  )
  return (
    <TwitterBot
      id="blab-reporter-twitter-timeline"
      username="BLAB_Reporter"
      loadingMessage={loadingMsg}
    />
  );
}

BLABReporter.propTypes = {};

export default BLABReporter;
