import React from "react";
import TwitterBot from "./TwitterBot";
import "./Reporter.css";

/** Display the latest tweets made by BLAB Reporter.
 *
 * @category Services
 * @subcategory Reporter
 * @component
 * */
const BLABReporter = () => {
  return (
    <TwitterBot
      id="blab-reporter-twitter-timeline"
      username="BLAB_Reporter"
    />
  );
};

export default BLABReporter;
