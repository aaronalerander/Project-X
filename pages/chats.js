import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Context } from "../context";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const ChatEngineWrapper = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngineWrapper)
);

const ChatSocket = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatSocket)
);

const ChatFeed = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatFeed)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/");
  });

  if (!showChat) return <div />;

  return (
    <div className="background-chat">
      <ChatEngineWrapper>
        <ChatSocket
          projectID="27e66807-2beb-4656-9292-e6e821608ab9"
          chatID="82737"
          chatAccessKey="ca-945fa971-2859-4787-bda4-f29fc88946c4"
          senderUsername={username}
        />
        <div className="flex-box">
          <h1 style={{ marginRight: "20px" }}>Project x</h1>
          <button type="submit" className="add-chat-button">
            Click to add a new chat
          </button>
        </div>

        <div className="flex-box">
          <div className="chat-container">
            <ChatFeed
              activeChat="82737"
              renderNewMessageForm={() => <MessageFormSocial />}
            />
          </div>
        </div>
      </ChatEngineWrapper>
    </div>
  );
}
