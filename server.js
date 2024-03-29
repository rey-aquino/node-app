const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const mongoose = require("mongoose");
let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {
	socket.emit('loggedIn', {
		users: users.map(s => s.username),
		messages: messages
	});

	socket.on('newuser', username => {
		console.log(`${username} has join the chat.`);
		socket.username = username;
		users.push(socket);

		io.emit('userOnline', socket.username);
	});

	socket.on('msg', msg => {
		let message = new ChatModel({
            index: index,
			username: socket.username,
			msg: msg
        });
        
        messages.push(message);

        io.emit('msg', message);

        index++;
	});
	
	// Disconnect
	socket.on("disconnect", () => {
		console.log(`${socket.username} has left the chat.`);
		io.emit("userLeft", socket.username);
		users.splice(users.indexOf(socket), 1);
	});
});

http.listen(process.env.PORT || 3000, () => {
	console.log("Listening on port %s", process.env.PORT || 3000);
});