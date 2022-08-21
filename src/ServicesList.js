import React from "react";
import { Trans } from "react-i18next";

const GetServicesList = () => {
  return [
    {
      name: "ChatBot",
      title: <Trans i18nKey="chatBotTitle">ChatBot</Trans>,
      text: (
        <Trans i18nKey="chatBotText">An agent specialized in the Blue Amazon</Trans>
      ),
      active: true,
      image: "Chatbot.jpg",
      imageAltKey: "chatBotImageAlt",
    },
    {
      name: "Reporter",
      title: <Trans i18nKey="reporterTitle">Journalist Robot</Trans>,
      text: (
        <Trans i18nKey="reporterText">
          A robot that generates news on the Blue Amazon
        </Trans>
      ),
      active: true,
      image: "RoboJornalista.jpeg",
      imageAltKey: "reporterImageAlt",
    },
    {
      name: "Wiki",
      title: <Trans i18nKey="wikiTitle">Wiki</Trans>,
      text: <Trans i18nKey="wikiText">A wiki focused on the Blue Amazon</Trans>,
      active: true,
      image: "Wiki.png",
      imageAltKey: "wikiImageAlt",
    },
    {
      name: "quarto",
      title: "a",
      text: "exemplo",
      active: false,
      image: "Wiki.png",
      imageAltKey: "a",
    },
    {
      name: "quinte",
      title: "b",
      text: "exemplo",
      active: false,
      image: "Wiki.png",
      imageAltKey: "a",
    },
  ];
}

export default GetServicesList;
