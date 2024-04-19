const app = require("express")();
const httpServer = require("http").createServer(app);
const morgan = require("morgan"); //Logs the requests
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;
//Database
const { addUser, removeUser, getAllUsers } = require("./DB/users");
const { addRoom, removeRoom, getAllRooms } = require("./DB/rooms");
const {
  addStory,
  removeStory,
  getAllStories,
  addShowHide,
  getAllShowHide,
  addStoryPoint,
  getAllStoryPoints,
} = require("./DB/story");

app.get("/", (req, res) => {
  res.send("<h3>Mahi-Poniting-Poker-API is alive.</h3>");
});

io.on("connect", (socket) => {
  console.log("User Connected.");
  console.log("ID: ",socket.id);
  //#region Room & User Activity
  //When user click on Join Now
  socket.on("joinRoom", (data) => {
    socket.join(data);
    socket.broadcast.to(data.roomId).emit("user joined room");
    io.in(data.roomId).emit("allUsers", data);
    addRoom(data.roomId); //create new room
    data.socketId = socket.id; //create unique socket id for each user
    let userStatus = addUser(data); //create new user
    console.log(userStatus);
  });

  //get all rooms
  io.emit("allRooms", getAllRooms());

  //get all users
  io.emit("allUsers", getAllUsers());
  //#endregion

  //#region Story Description Activity
  //get story Description
  io.emit("allStories", getAllStories());

  //when observer update story desscription
  socket.on("storyDescription", (data) => {
    io.in(data.roomId).emit("allStories", data);
    addStory(data);
  });
  //#endregion

  //#region Show Hide Button Activity
  //get all show hide
  io.emit("getAllShowHide", getAllShowHide());

  //when observer click on show hide button
  socket.on("setShowHide", (data) => {
    io.in(data.roomId).emit("getAllShowHide", data);
    addShowHide(data);
  });
  //#endregion

  //#region Story Point Activity
  io.emit("getStoryPoint", getAllStoryPoints());

  //when observer click on show hide button
  socket.on("setStoryPoint", (data) => {
    io.in(data.roomId).emit("getStoryPoint", data);
    addStoryPoint(data);
  });
  //#endregion

  //#region Disconnect Activity
  //Disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log("ID: ",socket.id);
    //removeUser(socket.id);
  });
  //#endregion
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
