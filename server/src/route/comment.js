import express from "express";
import {
  fetchNodeComment,
  fetchRootComment,
  comment,
} from "../controllers/commentController.js";
import { verifyAccessToken,activeOnlinePost} from "../controllers/middlewareControler.js";

const commentRouter = express.Router();

commentRouter.post("/fetch-root-comment", verifyAccessToken, fetchRootComment);
commentRouter.post("/fetch-node-comment", verifyAccessToken, fetchNodeComment);
commentRouter.post("/", verifyAccessToken, comment);

export default commentRouter