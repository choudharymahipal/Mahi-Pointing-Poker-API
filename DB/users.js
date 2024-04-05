//Interface should be like this
// [
//   {
//     roomId: "",
//     isObserver: true,
//     username: ""
//   }
// ]

const users = [];

const addUser = ({ username, roomId, isObserver }) => {
  const existingUser = users.find(
    (user) => user.roomId === roomId && user.username === username
  );

  if (!name || !room) {
    return { error: "Username and room are required." };
  }

  if (existingUser) {
    return { error: "Username already exists." };
  }

  const user = {
    roomId: roomId,
    isObserver: isObserver,
    username: username,
  };
  users.push(user);
  return { user };
};

const removeUser = ({ roomId, username }) => {
  const index = users.findIndex(
    (user) => user.roomId === roomId && user.username === username
  );
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = ({ roomId, username }) =>
  users.find((user) => user.roomId === roomId && user.username === username);

const getAllUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getAllUsersInRoom };
