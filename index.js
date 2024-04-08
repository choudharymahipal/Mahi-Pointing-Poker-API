const app = require("express")();
const httpServer = require("http").createServer(app);
const morgan = require("morgan"); //Logs the requests
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const port = process.env.PORT || 3000;
//Database
const { addUser, removeUser, getAllUsers } = require("./DB/users");
const { addRoom, removeRoom, getAllRooms } = require("./DB/rooms");
const { addStory, removeStory, getAllStories } = require("./DB/story");

io.on("connect", (socket) => {
  //When user click on Join Now
  socket.on("joinRoom", (data) => {
    socket.join(data);
    //confirm please -> when user want to join room that time broadcast is required or not??
    socket.broadcast.to(data.roomId).emit("user joined room");
    io.in(data.roomId).emit("allUsers", data);
    addRoom(data.roomId); //create new room
    let userStatus = addUser(data); //create new user
    console.log(userStatus);
  });

  //get all rooms
  io.emit("allRooms", getAllRooms());

  //get all users
  io.emit("allUsers", getAllUsers());

  //get story Description
  io.emit("allStories", getAllStories());

  //when observer update story desscription
  socket.on("storyDescription", (data) => {
    console.log("received req at storyDescription");
    io.in(data.roomId).emit("allStories", data);
    addStory(data);
    console.log("allStories", data);
  });

  //Disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
