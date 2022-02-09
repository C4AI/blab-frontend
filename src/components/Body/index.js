import React, { useState } from "react";

import { Background } from "../Background";
import { Inicial } from "../Services/Inicial";
import { Chatbot } from "../Services/Chatbot";

import "./Body.css";


function Body() {
    const [service, setService] = useState("inicial");

    function serviceSwitch(service) {
        switch(service) {
            case "inicial":
                return <Inicial setService={setService}/>
            case "chatbot":
                return <Chatbot setService={setService}/>;
            case "wiki":
                return <></>;
            default:
                return <></>;
        }
    }

    return (
        <>
            <div className="App-body">
                <Background/>
                { serviceSwitch(service) }
            </div>
        </>
    );
}

export default Body;
