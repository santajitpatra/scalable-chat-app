"use client";

import { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

const Page = () => {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <h1>All Messages will appear here</h1>
      </div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Message..."
          type="text"
        />
        <button
          onClick={(e) => sendMessage(message)}
          className={classes["button"]}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
