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

  //When user click on Join Now
  socket.on("joinRoom", (data) => {
    socket.join(data);
    //confirm please -> when user want to join room that time broadcast is required or not??
    socket.broadcast.to(data.roomId).emit("user joined room");
    //set & get users
    io.in(data.roomId).emit("allUsers",data);
    console.log("join Room:", data);
  });


  //when observer update story desscription
  socket.on("storyDescription", (data) => {
    console.log("received req at storyDescription");
    //set & get story description
    io.in(data.roomId).emit("newStoryDescription",data);
    console.log("newStoryDescription",data);
  });

  //Disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


httpServer.listen(port, () => console.log(`listening on port ${port}`));
