const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const Filter = require("bad-words");
const filter = new Filter();
const { generateMessage, generateLocationTime } = require("./utils/message");
const { addUser, removeUser, getUserInRoom, getUser } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.port || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


io.on("connection", (socket) => {
  socket.emit("response", generateMessage("Welcome"));
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {  
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("response", generateMessage(`Welcome ${user.username}`));
    socket.broadcast
      .to(user.room)
      .emit("response", generateMessage(`${user.username} has join now`));

      io.to(user.room).emit('roomData', {
        room : user.room,
        users : getUserInRoom(user.room)
      })
  });

  socket.on("send", (response, callback) => {
    console.log(response);
    const user = getUser(socket.id);
    if (filter.isProfane(response)) {
      return callback("Prafanity is not allowed!");
    }

    io.to(user.room).emit("response", generateMessage(user.username,response));

    
    callback("Recieved --Server");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "response",
        generateMessage(`${user.username} has left the chat!`)
      );
    }

    io.to(user.room).emit('roomData', {
      room : user.room,
      users : getUserInRoom(user.room)
    })
  });

  socket.on("locationInfo", (position) => {
    const user = getUser(socket.id)
    io.to(user.room).emit("serverLocation", generateLocationTime(user.username,position));
  });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
