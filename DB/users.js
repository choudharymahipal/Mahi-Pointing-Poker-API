//Interface should be like this
// [
//   {
//     roomId: "",
//     isObserver: true,
//     username: ""
//   }
// ]

const users = [];

const addUser = (data) => {
  const existingUser = users.find(
    (user) => user.roomId === data.roomId && user.username === data.username
  );

  if (existingUser) {
    return { error: "Username already exists." };
  }

  const user = {
    roomId: data.roomId,
    isObserver: data.isObserver,
    username: data.username
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

const getAllUsers = function () {
  return users;
};

module.exports = { addUser, removeUser, getAllUsers };
