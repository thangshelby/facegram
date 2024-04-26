import express from "express";
import {
  createPost,
  getUserPosts,
  deletePost,
  likePost,
  unLikePost,
  getHomeFeed,
  getPost,
} from "../controllers/postController.js";

import { verifyAccessToken,activeOnlinePost,unActiveOnlinePost} from "../controllers/middlewareControler.js";

const postRouter = express.Router();


postRouter.get("/home-feed/:userId", verifyAccessToken, getHomeFeed);
postRouter.get("/my-posts/:userId", verifyAccessToken, getUserPosts);
postRouter.get("/get-post/:postId",verifyAccessToken,activeOnlinePost, getPost);
postRouter.post('/un-active-online-post',verifyAccessToken,unActiveOnlinePost)
postRouter.post("/create-post", verifyAccessToken, createPost);
postRouter.get("/like/:postId/:userId", verifyAccessToken, likePost);
postRouter.get("/unlike/:postId/:userId", verifyAccessToken, unLikePost);
postRouter.get("/delete-post/:id", verifyAccessToken, deletePost);


export default postRouter;
