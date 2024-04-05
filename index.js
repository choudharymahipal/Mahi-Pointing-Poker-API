const app = require("express")();
const httpServer = require("http").createServer(app);
const morgan = require("morgan"); //Logs the requests
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const port = process.env.PORT || 3000;
const {
  addUser,
  removeUser,
  getUser,
  getAllUsersInRoom,
} = require("./DB/users");
const { addRoom, removeRoom, getAllRooms } = require("./DB/rooms");

io.on("connect", (socket) => {

  //When user click on Create Room
  socket.on("createChannel", (channelId) => {
    socket.join(channelId);
    addRoom(channelId); //save room
    console.log(`Room created as: ${channelId}`);
  });

  //When user click on Join Now. So we need to check tht room is existing or not.
  // socket.emit("getAllRooms", getAllRooms());

  socket.on("joinChannel", ({ username, room }) => {
    console.log("getroom",getAllRooms());
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


httpServer.listen(port, () => console.log(`listening on port ${port}`));
