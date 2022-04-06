import React, { useState } from "react";

import Background from "./Background";
import Initial from "./Services/Initial";
import ChatBot from "./Services/ChatBot";
import Reporter from "./Services/Reporter";

import "./Body.css";

/**
 *  Global website body.
 *
 *  @category Basic
 *  @component
 */
function Body() {
  const serviceArray = useState("Initial");

  /**
   *  State variable that determines current service being displayed.
   *
   *  @constant
   *  @type {string}
   */
  const service = serviceArray[0];

  /**
   *  Setter function for the "service" variable.
   *
   *  @constant
   *  @type {function}
   */
  const setService = serviceArray[1];

  function serviceSwitch(service) {
    switch (service) {
      case "Initial":
        return <Initial setService={setService} />;
      case "ChatBot":
        return <ChatBot setService={setService} />;
      case "Reporter":
        return <Reporter setService={setService} />;
      case "Wiki":
        return <></>;
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="App-body">
        <Background />
        {serviceSwitch(service)}
      </div>
    </>
  );
}

export default Body;
