const app = require("express")();
const httpServer = require("http").createServer(app);
const morgan = require("morgan"); //Logs the requests
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const port = process.env.PORT || 3000;
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//Help
//https://medium.com/swlh/build-a-chat-room-with-node-js-and-socket-io-e3e43f49a02d
var allMessages = [];
// Object to store active channels
const activeChannels = {};

app.get("/api/messages/:channelId", (req, res) => {
  const channelId = req.params.channelId;
  console.log("req received for: ", channelId);
  // You can handle querying messages from the database based on the channel ID here
  // For demonstration, let's assume you have a function to fetch messages by channel ID
  const messages = getMessagesByChannelId(channelId);
  console.log("output: ", messages);
  res.json(messages);
});

function getMessagesByChannelId(channelId) {
  // Simulated messages retrieval for demonstration
  return allMessages.filter((a) => a.channelId == channelId);
}

io.on("connect", (socket) => {
  //When user click on Create Room
  socket.on("createChannel", (channelId) => {
    socket.join(channelId);
    if (!activeChannels[channelId]) {
      activeChannels[channelId] = [];
    }
    activeChannels[channelId].push(channelId);
    console.log(`New channel created as: ${channelId}`);
  });

  //Join existing channel by users
  socket.on("joinChannel", ({ username, room }) => {
    console.log("username:", username);
    console.log("room:", room);
  });

  socket.on("sendMessage", (messageData) => {
    io.to(messageData.channelId).emit("newMessage", messageData);
    allMessages.push({
      text: messageData.text,
      sender: messageData.sender,
      channelId: messageData.channelId,
    });
    console.log(allMessages);
  });

  //Disconnect user
  socket.on("disconnect", () => {
    // Remove the socket from all channels
    // for (let channel in activeChannels) {
    //   activeChannels[channel] = activeChannels[channel].filter(
    //     (id) => id !== socket.id
    //   );
    //   if (activeChannels[channel].length === 0) {
    //     delete activeChannels[channel];
    //   }
    // }
    // const user = removeUser(socket.id);
    // if (user) {
    //   io.to(user.room).emit("message", {
    //     user: "adminX",
    //     text: `${user.name.toUpperCase()} has left.`,
    //   });
    //   io.to(user.room).emit("roomData", {
    //     room: user.room,
    //     users: getUsersInRoom(user.room),
    //   });
    // }
  });
});

//Get all channels list
app.get("/api/active-channels", (req, res) => {
  res.json(Object.keys(activeChannels));
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
