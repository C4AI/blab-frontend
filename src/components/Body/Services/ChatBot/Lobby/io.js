import axios from "axios";
import axiosRetry from "axios-retry";
import { Conversation } from "./data-structures";

axiosRetry(axios, { retries: 0, retryDelay: axiosRetry.exponentialDelay });

/*
IMPORTANT: Parts of this file have been implemented for testing purposes, only in
development environments. The real BLAB chatbot does not display chatrooms to the user,
only a single conversation. Hence, some limitations are expected: 
- If there are too many conversations, only the first page is considered.
- Any user can see and join any conversation.
*/

/**
 * @callback conversationListCallback
 * @param {Array<Object>} conversations available conversations
 */

/**
 * @callback errorCallback
 * @param {*} e error
 */

/**
 * @callback enterConversationCallback
 * @param {Object} conversation conversation data
 */

/**
 * Provides methods to get the list of conversations and join/create a conversation.
 *
 * @category Services
 * @subcategory ChatBot
 */
class LobbyIO {
  constructor() {
    this.timeoutIds = [];
    this.intentionallyClosed = false;
  }

  /** URL of the back-end server */
  static serverURL =
    process.env.REACT_APP_CHAT_URL || "http://" + window.location.hostname;

  /**
   * Get the list of current conversations.
   *
   * Since this method should only be used in a development environment, it only returns the first page of results.
   *
   * @param {number} interval interval between server requests to get the conversation list (or null to request only once)
   * @param {conversationListCallback} callback function called when the conversation list is refreshed
   * @param {errorCallback} failCallback function called if the request fails (after retries, if any)
   * @param {number} retries number of retries if the request fails with 5XX
   *
   * @category Services
   * @subcategory ChatBot
   */
  getConversations(callback, failCallback, interval, retries = Infinity) {
    axios
      .get(LobbyIO.serverURL + "/api/chat/conversations/", {
        "axios-retry": {
          retries: retries,
        },
      })
      .then((r) => {
        if (this.intentionallyClosed) return;
        callback(r.data.results);
        if (interval !== null)
          this.timeoutIds.push(
            setTimeout(
              () => this.getConversations(callback, failCallback, interval),
              interval
            )
          );
      })
      .catch((e) => failCallback && failCallback(e));
  }

  /**
   * Retrieve the list of available bots.

   * @param {function(Array<string>)} callback
   *   the function to be called when the list of bots is retrieved
   * @param {number} limit the maximum number of bots to fetch
   *
   * @category Services
   * @subcategory ChatBot
   */
  getBots(callback, limit = 100) {
    let url = LobbyIO.serverURL + "/api/chat/bots/";
    const params = {
      limit,
    };
    const fetch = (prev, page, cb) => {
      axios
        .get(url, {
          params: { ...params, page: page },
          "axios-retry": {
            retries: Infinity,
          },
        })
        .then((response) => {
          const partial = [...prev, ...response.data["results"]];
          if (response.data["next"]) fetch(partial, page + 1, cb);
          else cb(partial);
        });
    };
    fetch([], 1, callback);
  }

  /**
   * Create a conversation.
   * @param {string} nickname participant's name
   * @param {string} conversationName conversation title
   * @param {Array<string>} bots bots to include in the conversation
   * @param {enterConversationCallback} callback function to call if the
   *      conversation is created successfully (conversation data is
   *      passed in the first argument)
   * @param {errorCallback} failCallback function to call if the
   *      conversation creation fails (error is passed in the first argument)
   *
   * @category Services
   * @subcategory ChatBot
   */
  createConversation(nickname, conversationName, bots, callback, failCallback) {
    axios
      .post(
        LobbyIO.serverURL + "/api/chat/conversations/",
        {
          nickname: nickname,
          name: conversationName,
          bots: bots,
        },
        { withCredentials: true }
      )
      .then((r) => callback(Conversation.fromServerData(r.data)))
      .catch((e) => failCallback && failCallback(e));
  }

  /**
   * Join a conversation.
   * @param {string} nickname participant's name
   * @param {string} conversationId conversation id
   * @param {enterConversationCallback} callback function to call if the
   *      conversation is joined successfully (conversation is
   *      passed in the first argument)
   * @param {errorCallback} failCallback function to call if the
   *      conversation joining fails (error is passed in the first argument)
   *
   * @category Services
   * @subcategory ChatBot
   */
  joinConversation(nickname, conversationId, callback, failCallback) {
    axios
      .post(
        LobbyIO.serverURL +
          "/api/chat/conversations/" +
          conversationId +
          "/join/",
        {
          nickname: nickname,
        },
        { withCredentials: true }
      )
      .then((r) => callback(Conversation.fromServerData(r.data)))
      .catch((e) => failCallback && failCallback(e));
  }

  /** stop all connections
   *
   * @category Services
   * @subcategory ChatBot
   */
  close() {
    this.intentionallyClosed = true;
    for (const t of this.timeoutIds) clearTimeout(t);
  }
}

export default LobbyIO;
