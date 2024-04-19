const rooms = [];

//New room created by user. Do not save user with this room list here.
const addRoom = (id) => {
  rooms.push(id);
};

//whn observer disconnected from his room.
const removeRoom = (roomId) => {
  const index = rooms.findIndex((room) => room === roomId);
  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }
};

//List of rooms.
const getAllRooms = function () {
  return rooms;
};

module.exports = { addRoom, removeRoom, getAllRooms };
