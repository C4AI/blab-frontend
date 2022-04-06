import React from "react";
import { Trans } from "react-i18next";

const ServicesList = [
  {
    name: "ChatBot",
    title: <Trans i18nKey="chatBotTitle">ChatBot</Trans>,
    text: (
      <Trans i18nKey="chatBotText">A ChatBot specialized in Blue Amazon</Trans>
    ),
    active: true,
    image: "Chatbot.jpg",
    imageAlt: <Trans i18nKey="chatBotImageAlt">Illustration of chatbot</Trans>,
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
    imageAlt: <Trans i18nKey="reporterImageAlt">Illustration of a journalist bot</Trans>,
  },
  {
    name: "Wiki",
    title: <Trans i18nKey="wikiTitle">Wiki</Trans>,
    text: <Trans i18nKey="wikiText">A wiki focused on the Blue Amazon</Trans>,
    active: true,
    image: "Wiki.png",
    imageAlt: <Trans i18nKey="wikiImageAlt">Illustration of a wiki</Trans>,
  },
];

export default ServicesList;
