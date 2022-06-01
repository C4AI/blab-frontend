import { w3cwebsocket as W3CWebSocket } from "websocket";

import axios from "axios";
import axiosRetry from "axios-retry";
import { Message, MessageTypes } from "./data-structures";
import i18n from "../../../../../i18n";

axiosRetry(axios, { retries: 0, retryDelay: axiosRetry.exponentialDelay });

/**
 * @callback receiveEventCallback
 * @param {String} type event type
 * @param {String} event event contents
 */

/**
 * @callback updatePendingListCallback
 * @param {Array<Message>} messages pending messages
 */

/**
 * Provides methods to send/receive messages and other information
 * to/from the server.
 *
 * @category Services
 * @subcategory ChatBot
 */
class MessageIO {
  /** URL of the back-end server */
  static serverURL =
    process.env.REACT_APP_CHAT_URL || "http://" + window.location.hostname;

  /** URL of the back-end server used for the web socket */
  static webSocketURL =
    process.env.REACT_APP_CHAT_WS_URL || "ws://" + window.location.hostname;

  /**
   * Create an instance.
   *
   * @param {String} conversationId
   * @param {String} myParticipantId
   * @param {receiveEventCallback} onReceiveEvent called whenever an event
   *    is received
   * @param {updatePendingListCallback} onUpdatePendingList called whenever
   *    the list of pending messages changes
   */
  constructor(
    conversationId,
    myParticipantId,
    onReceiveEvent,
    onUpdatePendingList
  ) {
    this.conversationId = conversationId;
    this.myParticipantId = myParticipantId;
    this.ws = this.#createSocket();
    this.pending = new Map();
    this.onReceiveEvent = onReceiveEvent;
    this.onUpdatePendingList = onUpdatePendingList;
    this.intentionallyClosed = false;
  }

  /**
   * Create a socket connection.
   *
   * @returns {W3CWebSocket} a new socket connection
   */
  #createSocket() {
    const s = new W3CWebSocket(
      MessageIO.webSocketURL + "/ws/chat/" + this.conversationId + "/"
    );
    s.onmessage = (e) => this.#receiveEvent(e);
    s.onclose = (e) => this.#onClose(e);
    s.onopen = () => {
      this.#sendNextPendingMessage();
    };
    return s;
  }

  /**
   * Enqueue a message to be sent.
   *
   * @param {Message} message the message to be sent
   */
  enqueueMessage(message) {
    this.pending.set(message.localId, message);
    if (this.onUpdatePendingList)
      this.onUpdatePendingList(Array.from(this.pending.values()));
    if (this.pending.size === 1) this.#sendNextPendingMessage();
  }

  /**
   * Called when the web socket is closed.
   *
   * This method tries to reconnect after 500 ms.
   *
   * @param {ICloseEvent} event the close event
   */
  #onClose() {
    if (this.intentionallyClosed) return;
    console.log("Socket closed. Trying to reconnect soon...");
    setTimeout(() => {
      this.ws = this.#createSocket();
    }, 500);
  }

  /**
   * Called when an event is received by the web socket.
   * @param {IMessageEvent} event the receive event
   *
   * This method calls the callback functions for the corresponding
   * event types. If one of the events corresponds to a message that
   * was previously sent by this user and was still pending, then
   * it is removed from the list of pending messages, the callback
   * function is called and the next pending message (if any) is sent.
   */
  #receiveEvent(event) {
    const eventData = JSON.parse(event.data);
    if (this.onReceiveEvent)
      for (const [type, evt] of Object.entries(eventData))
        this.onReceiveEvent(type, evt);
    if (
      "message" in eventData &&
      eventData["message"]["sender_id"] === this.myParticipantId &&
      this.pending.delete(eventData["message"]["local_id"])
    ) {
      if (this.onUpdatePendingList)
        this.onUpdatePendingList(Array.from(this.pending.values()));
      this.#sendNextPendingMessage();
    }
  }

  /**
   * Send the next pending message, if any.
   */
  #sendNextPendingMessage() {
    if (this.pending.size >= 1 && this.ws.readyState === W3CWebSocket.OPEN)
      this.#sendMessage(this.pending.values().next().value);
  }

  /**
   * Send a message.
   *
   * @param {Message} message the message to be sent
   */
  #sendMessage(message) {
    const data = message.asObjectToSend();
    if (message.type == MessageTypes.TEXT) {
      this.ws.send(JSON.stringify(data));
    } else {
      axios
        .post(
          MessageIO.serverURL +
            "/api/chat/conversations/" +
            this.conversationId +
            "/messages/",
          data,
          { withCredentials: true }
        )
        .catch(() => this.#sendNextPendingMessage());
    }
  }

  /**
   * Retrieve old messages in the conversation.
   * @param {Date | String} until the maximum date/time
   *  (it can be a {@link Date} instance or an ISO-8601 string;
   *   "now" is also accepted to represent the current moment)
   * @param {function(Array<Message>)} callback
   *   the function to be called when the list of old messages is retrieved
   * @param {number} limit the maximum number of messages to fetch
   */
  getOldMessages(until, callback, limit = 100) {
    let url = `/api/chat/conversations/${this.conversationId}/messages/`;
    const params = {
      until: until === "now" ? "now" : until.toISOString(),
      limit: limit,
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
    fetch([], 1, (oldMessages) => {
      callback(
        oldMessages.map((m) => Message.fromServerData(m, this.myParticipantId))
      );
    });
  }

  /**
   * Change the name of the participant.
   *
   * @param {string} name participant's new name
   */
  changeParticipantName(name) {
    let url =
      `/api/chat/conversations/${this.conversationId}/` +
      `participants/${this.myParticipantId}/`;
    axios.patch(
      url,
      { name },
      {
        "axios-retry": {
          retries: Infinity,
        },
      }
    );
  }

  /**
   * Get the chat limits
   *
   * @param {conversationListCallback} callback function called when the limits are retrieved
   * @param {number} retries number of retries if the request fails with 5XX
   */
  getLimits(callback, retries = Infinity) {
    axios
      .get("/api/chat/limits/", {
        "axios-retry": {
          retries: retries,
        },
      })
      .then((r) => {
        if (this.intentionallyClosed) return;
        callback(r.data);
      })
      .catch(console.log);
  }

  /**
   * Close the connection.
   *
   * @category Services
   * @subcategory ChatBot
   */
  close() {
    this.intentionallyClosed = true;
    this.ws && this.ws.close();
  }

  static formatSize(b) {
    if (isNaN(b)) return "";
    const base = 1000; // it could be 1024 depending on the definition
    const pfx = ["", "kilo", "mega", "giga", "tera", "peta"];
    const i = Math.max(
      0,
      Math.min(
        pfx.length - 1,
        Math.floor(Math.log(Math.abs(b)) / Math.log(base))
      )
    );
    return new Intl.NumberFormat(i18n.language, {
      style: "unit",
      unit: pfx[i] + "byte",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    }).format(b / Math.pow(base, i));
  }

  static formatLength(t) {
    if (isNaN(t)) return "";
    if (t == Infinity) return "∞";
    const locale = i18n.language;
    const delimiter = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
      .formatToParts(new Date("1999-12-31T23:59:59"))
      .find((elem) => elem.type == "literal" && elem.value != " ").value;
    t = Math.floor(t);
    const hFmt = new Intl.NumberFormat(locale, { minimumIntegerDigits: 1 });
    const minFmt = new Intl.NumberFormat(locale, {
      minimumIntegerDigits: t >= 3600 ? 2 : 1,
    });
    const sFmt = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 });
    return (
      (t >= 3600 ? hFmt.format(Math.floor(t / 3600)) + delimiter : "") +
      minFmt.format(Math.floor((t % 3600) / 60)) +
      delimiter +
      sFmt.format(t % 60)
    );
  }
}

export default MessageIO;
