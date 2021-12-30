// i dont know if it is right to use context instead of passing it

const fetcher = async () => {
  console.log("in fetcher");

  let responce = await axios
    .get("https://api.chatengine.io/chats/", {
      headers: {
        "Project-ID": "27e66807-2beb-4656-9292-e6e821608ab9",
        "User-Name": Aaron,
        "User-Secret": cricketman157,
      },
    })
    .catch((error) => console.log(error));
  console.log(responce);
  return responce;
  //   return responce.json();
};

export default fetcher;

// async function createChat(userNamesArray) {
//     let responce = await axios
//       .put(
//         "https://api.chatengine.io/chats/",
//         { usernames: userNamesArray, title, is_direct_chat: false },
//         {
//           headers: {
//             "Project-ID": "27e66807-2beb-4656-9292-e6e821608ab9",
//             "User-Name": username,
//             "User-Secret": secret,
//           },
//         }
//       )
//       .catch((error) => console.log(error));

//     let chatId = responce.data.id;
//     return chatId;
//   }
