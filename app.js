// // const express = require('express');
// const express=require("express")
// const dotenv=require("dotenv")
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// const mongoose=require("mongoose")
// const cors = require("cors");
// // dotenv.config();
// dotenv.config()
// const app = express();
// const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI;

// app.use(cors());
// app.use(express.json());
// mongoose.connect(MONGO_URI)
// .then(() => {
// console.log("MongoDB connected successfully");
// })
// .catch((error) => {
// console.log("MongoDB connection failed");
// console.log(error);
// });
// const productRouter = require('./router/product');
// const authRoutes =
//     require("./router/aouthRouts");

// console.log("hello")
// app.use('/product', productRouter);
// app.use("/auth", authRoutes);
// app.listen(
// PORT,
// () => console.log(`Server is running on ${PORT}`)
// );



// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static("public"));

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("chatMessage", (message) => {
//     console.log("Message received:", message);

//     // Send the message to all connected users
//     io.emit("chatMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);//Express handles HTTP requests through this server.
const io = new Server(server);//Now the HTTP server supports Socket.IO connections
app.use(express.static("public"));
io.on("connection", (socket) => {
console.log("User connected");//This runs when a client establishes a Socket.IO connection.socket object represents that the 
// connected client
socket.on("chatMessage", (message) => {
io.emit("chatMessage", message);//This sends an event and data.
});//When the message event occurs, execute this function.
socket.on("disconnect", () => {
console.log("User disconnected");
});
});
server.listen(3000, () => {
console.log("Server running on port 3000");
});