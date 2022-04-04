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
    imageAlt: "Ilustração de um robô de conversa",
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
    imageAlt: "Ilustração de um robô jornalista",
  },
  {
    name: "Wiki",
    title: <Trans i18nKey="wikiTitle">Wiki</Trans>,
    text: <Trans i18nKey="wikiText">A wiki focused on the Blue Amazon</Trans>,
    active: true,
    image: "Wiki.png",
    imageAlt: "Ilustração de um Wiki",
  },
  {
    name: "4",
    title: "4",
    text: "Um quarto serviço de exemplo",
    active: false,
    image: "exemplo.png",
    imageAlt: "*",
  },
  {
    name: "5",
    title: "5",
    text: "Um quinto serviço de exemplo",
    active: false,
    image: "exemplo.png",
    imageAlt: "*",
  },
  {
    name: "6",
    title: "6",
    text: "Um sexto serviço de exemplo",
    active: false,
    image: "exemplo.png",
    imageAlt: "*",
  },
  {
    name: "*",
    title: "*",
    text: "Um * serviço de exemplo",
    active: false,
    image: "exemplo.png",
    imageAlt: "*",
  },
];

export default ServicesList;
