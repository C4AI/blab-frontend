import React, { useEffect, useState, Suspense } from "react";
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Lobby from "./Lobby/Lobby";
import Chat from "./Chat/Chat";

import { useTranslation } from "react-i18next";
import LobbyIO from "./Lobby/io";

import "./chatbot.css";
import style from "./style.js";

const theme = createTheme({
  palette: {
    primary: { main: "#1094ab" },
    secondary: { main: "#fcb421" },
  },
});

export const ChatBot = ({ setService }) => {
  const classes = style();
  const handleClick = () => {
    setService("Inicial");
  };

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
    <div className="chatbot">
      <div align="left">
        <Button className={classes.button} onClick={handleClick}
          startIcon={<KeyboardBackspaceIcon style={{ fontSize: 50 }} />}
        />
      </div>
      <Suspense fallback={<div>Loading... / Carregando...</div>}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" sx={{ position: "relative" }}>
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
                    {/* this is rendered when the user was 
                    previously in a conversation, but the
                    conversation data hasn't been loaded yet */}
                  </div>
                )
              ) : (
                <Chat conversation={conversation} onLeave={onLeave} />
              )
            ) : (
              <p>
                INVALID MODE. PLEASE SET THE ENVIRONMENT VALUE{" "}
                <code>REACT_APP_CHAT_MODE</code> TO <i>rooms</i> OR <i>bots</i> AND
                TRY AGAIN.
              </p>
            )}
          </Container>
        </ThemeProvider>
      </Suspense>
    </div>
  );
};

ChatBot.propTypes = {
    setService: PropTypes.func.isRequired
};
