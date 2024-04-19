const { removeRoom } = require("./rooms");
const users = [];

//When new user create room or join room.
const addUser = (data) => {
  const user = {
    userId: data.userId, //unique user id
    roomId: data.roomId,  //unique room id
    socketId:data.socketId, //It is current session id. It shows, user is active or not.
    isObserver: data.isObserver,  //true mean this user created new room.
    isOnline: true, //New user added on the server
    username: data.username,  //name of the user
  };

  users.push(user);
  return { user };
};

//when user disconnected or logout from frontend.
const removeUser = (userId) => {
  //find index from array so that we can remove based on their index id.
  const index = users.findIndex((user) => user.userId === userId);
  if (index !== -1) {
    if (users[index].isObserver) {
      //now remove room also because observer going to leave room.
      removeRoom(users[index].roomId);
    }
    console.log(users[index].username + " left the room.");
    return users.splice(index, 1)[0];
  }
};

//List of the users.
const getAllUsers = function () {
  return users;
};

module.exports = { addUser, removeUser, getAllUsers };
