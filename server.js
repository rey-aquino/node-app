const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
let users = [];
let message = [];
let index = 0;

io.on("connection", socket => {
    




    
    // Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the chat.`);
    });
});



http.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port %s", process.env.PORT || 3000);
})