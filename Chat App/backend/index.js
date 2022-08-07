const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./router.js");
const { addUser, removeUser, getUser, getAllUser } = require("./users.js");

const app = express();
const server = http.createServer(app);
dotenv.config();
console.log(`${process.env.FRONTEND_URL}`);

const io = require("socket.io")(server, {
	cors: {
		origin: `${process.env.FRONTEND_URL}`,
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
	socket.on("join", ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name: name, room: room });
		if (error) return callback(error);

		socket.join(user.room);

		socket.emit("message", { user: "Admin", text: `${user.name}, welcome to the room ${user.room}` });
		socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.name} has joined.` });

		io.to(user.room).emit("roomData", { room: user.room, users: getAllUser(user.room) });

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });

		callback();
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
			io.to(user.room).emit("roomData", { room: user.room, users: getAllUser(user.room) });
		}
	});
});

server.listen(PORT, () => console.log("Server has started on port " + PORT));
