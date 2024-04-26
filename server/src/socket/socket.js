import express from "express";
import { Server } from "socket.io";
import http from "http";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    methods: "GET,POST",
  },
});

export const onlineUsers = {};
export const onlinePosts = {};

export const getSocketIdFromUserId = (userId) => {
  if (userId in onlineUsers) {
    return onlineUsers[userId];
  }
};

export const getUserIdFromPostId = (postId) => {
  if (postId in onlinePosts) {
    return onlinePosts[postId];
  }
};

io.on("connection", (socket) => {
  console.log("User connect successfully", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    onlineUsers[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  }
  socket.on("disconnect", () => {
    console.log("User disconnect");
    if (userId != undefined) {
      delete onlineUsers[userId];
    }
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});
