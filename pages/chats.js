import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Context } from "../context";
import axios from "axios";

import useSWR from "swr";
//import { Socket } from "react-chat-engine";
// import fetcher from "../utils/fetcher";
// import fetcher from "../utils/fetcher";

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

const Socket = dynamic(() =>
  import("react-chat-engine").then((module) => module.Socket)
);
const ChatFeed = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatFeed)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const fetcher = async () => {
    let responce = await axios
      .get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": "27e66807-2beb-4656-9292-e6e821608ab9",
          "User-Name": username,
          "User-Secret": secret,
        },
      })
      .catch((error) => console.log(error));

    console.log("hi fetach");
    console.log(responce.data);
    return responce.data;
  };

  //const { data } = useSWR("getChats", fetcher, { refreshInterval: 1000 });
  const { data } = useSWR("getChats", fetcher);

  async function createChat(userNamesArray) {
    let responce = await axios
      .put(
        "https://api.chatengine.io/chats/",
        { usernames: userNamesArray, title, is_direct_chat: false },
        {
          headers: {
            "Project-ID": "27e66807-2beb-4656-9292-e6e821608ab9",
            "User-Name": username,
            "User-Secret": secret,
          },
        }
      )
      .catch((error) => console.log(error));

    let chatId = responce.data.id;
    return chatId;
  }

  async function getAllUserNames() {
    let responce = await axios.get("https://api.chatengine.io/users/", {
      headers: {
        "Private-key": "17d5988f-5d54-4646-af58-5f5cfb276c03",
      },
    });
    let userDataArray = responce.data;
    let userNameArray = [];

    for (const x of userDataArray) {
      if (x.username !== username) {
        userNameArray.push(userDataArray[1].username);
      }
    }
    return userNameArray;
  }

  async function onAddChat(e) {
    e.preventDefault();
    e.target.reset();

    let userNamesArray = await getAllUserNames();
    await createChat(userNamesArray);
  }

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/");
  });

  if (!showChat || !data) return <div />;
  //82737
  //ca-945fa971-2859-4787-bda4-f29fc88946c4
  return (
    <div className="background-chat">
      <ChatEngineWrapper>
        <div className="flex-box">
          <h1 style={{ marginRight: "20px" }}>Project x</h1>
          <form className="auth-form" onSubmit={(e) => onAddChat(e)}>
            <div className="flex-box">
              <div className="input-container">
                <input
                  type="input"
                  placeholder="Title"
                  className="text-input"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button type="submit" className="add-chat-button">
                Click to add a new chat
              </button>
            </div>
          </form>
        </div>

        {/* <Socket
          projectID="27e66807-2beb-4656-9292-e6e821608ab9"
          userName={username}
          userSecret={secret}
        /> */}

        {data.map((chat) => console.log(chat))}
        <div className="flex-box">
          {data.map((chat) => (
            <div>
              <h1>{chat.id}</h1>
              {/* <ChatSocket
                key={chat.id}
                projectID="27e66807-2beb-4656-9292-e6e821608ab9"
                chatID={chat.id}
                chatAccessKey={chat.access_key}
                senderUsername={username}
              /> */}

              <Socket
                projectID="27e66807-2beb-4656-9292-e6e821608ab9"
                userName={username}
                userSecret={secret}
              />

              <div className="flex-box">
                <div className="chat-container">
                  <ChatFeed
                    key={chat.id}
                    activeChat={chat.id}
                    renderNewMessageForm={() => <MessageFormSocial />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*  
        <ChatSocket
          projectID="27e66807-2beb-4656-9292-e6e821608ab9"
          chatID="83129"
          chatAccessKey="ca-0753ddf1-7f47-4f7b-879a-64d565a0f1b5"
          senderUsername={username}
        />

        <div className="flex-box">
          <div className="chat-container">
            <ChatFeed
              activeChat="83129"
              renderNewMessageForm={() => <MessageFormSocial />}
            />
          </div>
        </div> */}
      </ChatEngineWrapper>
    </div>
  );
}
