import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { createTheme, ThemeProvider } from "@mui/material";

import ServiceContainer from "../../ServiceContainer";
import ServiceLoading from "../../ServiceLoading";

import Lobby from "./Lobby/Lobby";
import Chat from "./Chat/Chat";

import { useTranslation } from "react-i18next";
import LobbyIO from "./Lobby/io";

import "./chatbot.css";

const theme = createTheme({
  palette: {
    primary: { main: "#1094ab" },
    secondary: { main: "#fcb421" },
  },
});

/**
 *  ChatBot service. Currently displays a lobby
 *  where they can create and enter conversations with bots.
 *  If a conversation was previously open, it will skip the lobby
 *  and head straight for the chat room.
 *
 *  @category Services
 *  @subcategory ChatBot
 *  @component
 */
const ChatBot = ({setService}) => {
  const { i18n } = useTranslation();

  const conversationIdKey = "conversationId";
  const myParticipantIdKey = "myParticipantId";

  const [conversationId, setConversationId] = useState(
    localStorage.getItem(conversationIdKey)
  );

  const [myParticipantId, setMyParticipantId] = useState(
    localStorage.getItem(myParticipantIdKey)
  );

  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (conversationId) localStorage.setItem(conversationIdKey, conversationId);
    else localStorage.removeItem(conversationIdKey);
  }, [conversationId]);

  useEffect(() => {
    if (myParticipantId)
      localStorage.setItem(myParticipantIdKey, myParticipantId);
    else localStorage.removeItem(myParticipantIdKey);
  }, [myParticipantId]);

  function enterConversation(conversation) {
    setMyParticipantId(conversation.myParticipantId);
    setConversation(conversation);
    setConversationId(conversation.id);
  }

  function onLeave() {
    setConversationId(null);
    setConversation(null);
    setMyParticipantId(null);
  }

  const mode = process.env.REACT_APP_CHAT_MODE;
  const bots = JSON.parse(process.env.REACT_APP_CHAT_BOTS || "[]");

  useEffect(() => {
    if (conversationId && !conversation) {
      new LobbyIO().joinConversation(
        "",
        conversationId,
        enterConversation,
        onLeave
      );
    }
  }, [conversationId, conversation]);

  if (process.env.NODE_ENV === "development")
    console.log({
      environment: process.env.NODE_ENV,
      mode: process.env.REACT_APP_CHAT_MODE,
      language: i18n.language,
      languages: i18n.languages,
      resolvedLanguage: i18n.resolvedLanguage,
    });

  return (
      <ServiceContainer setService={setService}>
        <ThemeProvider theme={theme}>
          {["rooms", "bots"].includes(mode) ? (
            !conversation ? (
              !conversationId ? (
                <Lobby
                  onCreateConversation={enterConversation}
                  onJoinConversation={enterConversation}
                  mode={mode}
                  bots={bots}
                />
              ) : (
                <div>
                  {
                    <ServiceLoading/> /* this is rendered when the user was 
                  previously in a conversation, but the
                  conversation data hasn't been loaded yet */
                  }
                </div>
              )
            ) : (
              <Chat conversation={conversation} onLeave={onLeave} />
            )
          ) : (
            <p>
              INVALID MODE. PLEASE SET THE ENVIRONMENT VALUE{" "}
              <code>REACT_APP_CHAT_MODE</code> TO <i>rooms</i> OR <i>bots</i>{" "}
              AND TRY AGAIN.
            </p>
          )}
        </ThemeProvider>
      </ServiceContainer>
  );
};

ChatBot.propTypes = {
  /** Setter for the website Body's service variable. */
  setService: PropTypes.func.isRequired,
};

export default ChatBot;
