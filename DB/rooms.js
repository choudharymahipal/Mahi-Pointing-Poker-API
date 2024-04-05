const rooms = [];

const addRoom = (id) => {
  rooms.push(id);
};

const removeRoom = (roomId) => {
  const index = rooms.findIndex((room) => room === roomId);
  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }
};

const getAllRooms = function () {
  return rooms;
};

module.exports = { addRoom, removeRoom, getAllRooms };
