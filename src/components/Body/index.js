import React, { useState } from "react";

import { Background } from "./Background";
import { Inicial } from "./Services/Inicial";
import { ChatBot } from "./Services/ChatBot";

import "./Body.css";

function Body() {
  const [service, setService] = useState("Inicial");

  function serviceSwitch(service) {
    switch (service) {
      case "Inicial":
        return <Inicial setService={setService} />;
      case "ChatBot":
        return <ChatBot setService={setService}/>;
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
