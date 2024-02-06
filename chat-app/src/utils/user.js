const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existUsername = users.find((user) => user.username === username && user.room === room);

  if (existUsername) {
    return { error: "Username is in use!" };
  }

    const user = { id, username, room };
    users.push(user);
    return  { user } ;
};

const removeUser = (id) => {
  const index = users.findIndex((item) => item.id === id);
  if (index !== -1) {
    const user =  users.splice(index, 1);
    return user[0]
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id == id)
  return user
}

const getUserInRoom = (room) => {
  return users.filter((user) => user.room == room)
}

// addUser({ id : 2, username : 'Anupam', room : 'javascript' })
// addUser({ id : 3, username : 'nupam', room : 'script' })
// addUser({ id : 4, username : 'upam', room : 'java' })
// console.log(users);

// console.log(removeUser(4));
// console.log(users);


module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom
}
